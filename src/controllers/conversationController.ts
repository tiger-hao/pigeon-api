import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validationMiddleware } from '../middleware/validationMiddleware';
import * as conversationService from '../services/conversationService';

export const validateConversation = [
  check('members')
    .exists().withMessage('Required')
    .isArray({ min: 1 }),
  check('members.*')
    .isString(),
  validationMiddleware
];

export async function createConversation(req: Request, res: Response, next: NextFunction) {
  const { id: userId } = res.locals.user;
  const { name, members } = req.body;

  try {
    const conversation = await conversationService.createConversation(
      {
        name,
        members: [userId, ...members]
      },
      userId
    );

    return res.status(201).json({
      status: 'success',
      data: {
        conversation
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function getConversationById(req: Request, res: Response, next: NextFunction) {
  const { conversationId } = req.params;
  const { id: userId } = res.locals.user;

  try {
    const conversation = await conversationService.getConversationById(conversationId, userId);

    if (!conversation) {
      return res.status(400).json({
        status: 'fail',
        data: {
          conversation: 'Conversation does not exist'
        }
      });
    }

    return res.json({
      status: 'success',
      data: {
        conversation
      }
    });
  } catch (err) {
    next(err);
  }
}


export async function getConversationsByMember(req: Request, res: Response, next: NextFunction) {
  const { id } = res.locals.user;

  try {
    const conversations = await conversationService.getConversationsByMember(id);

    return res.json({
      status: 'success',
      data: {
        conversations
      }
    });
  } catch (err) {
    next(err);
  }
}
