import { MessageModel, MessageDocument } from '../models/messageModel';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  createdAt: string;
  message: string;
}

export async function createMessage(message: Omit<Message, 'id' | 'createdAt'>): Promise<Message> {
  try {
    const messageDoc = await MessageModel.create(message);

    return {
      id: messageDoc.id,
      conversationId: messageDoc.conversationId,
      senderId: messageDoc.senderId,
      createdAt: messageDoc.createdAt,
      message: messageDoc.message
    };
  } catch (err) {
    throw err;
  }
}

export async function getMessageById(id: string): Promise<Message | null> {
  try {
    const messageDoc = await MessageModel.findById(id);

    return messageDoc && {
      id: messageDoc.id,
      conversationId: messageDoc.conversationId,
      senderId: messageDoc.senderId,
      createdAt: messageDoc.createdAt,
      message: messageDoc.message
    };
  } catch (err) {
    throw err;
  }
}

export async function getMessagesByConversation(conversationId: string): Promise<Message[] | null> {
  try {
    const messageDocs = await MessageModel.find({ conversationId });

    return messageDocs.map((messageDoc: MessageDocument) => ({
      id: messageDoc.id,
      conversationId: messageDoc.conversationId,
      senderId: messageDoc.senderId,
      createdAt: messageDoc.createdAt,
      message: messageDoc.message
    }));
  } catch (err) {
    throw err;
  }
}
