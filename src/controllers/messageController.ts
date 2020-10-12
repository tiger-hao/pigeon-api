import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { Server } from 'socket.io';
import { validationMiddleware } from '../middleware/validationMiddleware';
import * as messageService from '../services/messageService';
import { getConversationById } from '../services/conversationService';

export const validateMessage = [
  check('text')
    .exists().withMessage('Required')
    .isString(),
  validationMiddleware
];

export async function createMessage(req: Request, res: Response, next: NextFunction) {
  const { id: senderId } = res.locals.user;
  const { conversationId } = req.params;
  const { text } = req.body;
  const io: Server = req.app.locals.io;

  try {
    const message = await messageService.createMessage({
      conversation: conversationId,
      sender: senderId,
      text
    });

    const { members } = await getConversationById(conversationId);

    members.forEach(({ id: memberId }) => {
      if (memberId !== senderId) {
        io.emit(memberId, { message, conversationId })
      }
    })

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
