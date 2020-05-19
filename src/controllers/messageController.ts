import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validationMiddleware } from '../middleware/validationMiddleware';
import * as messageService from '../services/messageService';

export const validateMessage = [
  check('text')
    .exists().withMessage('Required')
    .isString(),
  validationMiddleware
];

export async function createMessage(req: Request, res: Response, next: NextFunction) {
  const { id: senderId } = req.app.locals.user;
  const { conversationId } = req.params;
  const { text } = req.body;

  try {
    const message = await messageService.createMessage({
      conversation: conversationId,
      sender: senderId,
      text
    });

    return res.status(201).json({
      status: 'success',
      data: {
        message
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function getMessageById(req: Request, res: Response, next: NextFunction) {
  const { messageId } = req.params;

  try {
    const message = await messageService.getMessageById(messageId);

    if (!message) {
      return res.status(400).json({
        status: 'fail',
        data: {
          conversation: 'Message does not exist'
        }
      });
    }

    return res.json({
      status: 'success',
      data: {
        message
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function getMessagesByConversation(req: Request, res: Response, next: NextFunction) {
  const { conversationId } = req.params;

  try {
    const messages = await messageService.getMessagesByConversation(conversationId);

    return res.json({
      status: 'success',
      data: {
        messages
      }
    });
  } catch (err) {
    next(err);
  }
}
