import { ConversationModel, ConversationDocument } from '../models/ConversationModel';
import { MessageDocument } from '../models/messageModel';
import { Message } from './messageService';
import { User } from './userService';

export interface Conversation {
  id: string;
  name: string;
  members: Pick<User, 'id' | 'name'>[];
  lastMessage?: Omit<Message, 'conversation'>;
}

export async function createConversation(conversation: Omit<Conversation, 'id'>): Promise<Conversation> {
  try {
    const conversationDoc = await ConversationModel.create(conversation)

    return getPopulatedConversation(conversationDoc);
  } catch (err) {
    throw err;
  }
}

export async function getConversationById(id: string): Promise<Conversation | null> {
  try {
    const conversationDoc = await ConversationModel.findById(id);

    return conversationDoc && getPopulatedConversation(conversationDoc);
  } catch (err) {
    throw err;
  }
}

export async function getConversationsByMember(memberId: string): Promise<Conversation[]> {
  try {
    const conversationDocs = await ConversationModel.find({ members: memberId })
      .populate('members', 'name')
      .populate({
        path: 'lastMessage',
        select: '-conversation',
        populate: {
          path: 'sender',
          select: 'name'
        }
      });

    return conversationDocs.map((conversationDoc: ConversationDocument) => conversationDoc.toJSON());
  } catch (err) {
    throw err;
  }
}

export async function setLastMessage(messageId: string, conversationId: string): Promise<void> {
  try {
    await ConversationModel.updateOne({ _id: conversationId }, { lastMessage: messageId });
  } catch (err) {
    throw err;
  }
}

async function getPopulatedConversation(conversationDoc: ConversationDocument): Promise<Conversation> {
  await conversationDoc
    .populate('members', 'name')
    .populate({
      path: 'lastMessage',
      select: '-conversation',
      populate: {
        path: 'sender',
        select: 'name'
      }
    })
    .execPopulate();

  return conversationDoc.toJSON();
}
