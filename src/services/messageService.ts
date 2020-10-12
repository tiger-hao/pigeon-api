import { MessageModel, MessageDocument } from '../models/messageModel';
import { Conversation, setLastMessage } from './conversationService';
import { User } from './userService';

export interface Message {
  id: string;
  conversation: Conversation;
  sender: Pick<User, 'id' | 'name'>;
  createdAt: string;
  text: string;
}

export async function createMessage(message: Pick<MessageDocument, 'conversation' | 'sender' | 'text'>): Promise<Omit<Message, 'conversation'>> {
  try {
    const messageDoc = await MessageModel.create(message);
    await setLastMessage(messageDoc.id, messageDoc.conversation);
    const { conversation, ...msg } = await getPopulatedMessage(messageDoc);

    return msg;
  } catch (err) {
    throw err;
  }
}

export async function getMessageById(id: string): Promise<Message | null> {
  try {
    const messageDoc = await MessageModel.findById(id);

    return messageDoc && getPopulatedMessage(messageDoc);
  } catch (err) {
    throw err;
  }
}

export async function getMessagesByConversation(conversationId: string): Promise<Omit<Message, 'conversation'>[]> {
  try {
    const messageDocs = await MessageModel.find({ conversation: conversationId }, '-conversation')
      .sort({ createdAt: 'asc' }).populate('sender', 'name');

    return messageDocs.map((messageDoc: MessageDocument) => messageDoc.toJSON());
  } catch (err) {
    throw err;
  }
}

async function getPopulatedMessage(messageDoc: MessageDocument): Promise<Message> {
  await messageDoc
    .populate({
      path: 'conversation',
      select: '-lastMessage',
      populate: {
        path: 'members',
        select: 'name'
      }
    })
    .populate('sender', 'name')
    .execPopulate();

  return messageDoc.toJSON();
}
