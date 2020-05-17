import { Router, Request, Response } from 'express';
import * as messageController from '../controllers/messageController';
import { authMiddleware } from '../middleware/authMiddleware';

export const messagesRouter = Router({ mergeParams: true });

messagesRouter.use(authMiddleware);
messagesRouter.route('/:messageId').get(messageController.getMessageById)

messagesRouter.route('/')
  .get(messageController.getMessagesByConversation)
  .post(messageController.validateMessage, messageController.createMessage);
