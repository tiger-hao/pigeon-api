import { Router, Request, Response } from 'express';
import * as conversationController from '../controllers/conversationController';
import { authMiddleware } from '../middleware/authMiddleware';
import { messagesRouter } from './messagesRoute';

export const conversationsRouter = Router();

conversationsRouter.use(authMiddleware);

conversationsRouter.route('/')
  .get(conversationController.getConversationsByMember)
  .post(conversationController.validateConversation, conversationController.createConversation);

conversationsRouter.route('/:conversationId').get(conversationController.getConversationById);

conversationsRouter.use('/:conversationId/messages/', messagesRouter);
