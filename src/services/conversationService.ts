import { ConversationModel, ConversationDocument } from '../models/conversationModel';
import { MessageDocument } from '../models/messageModel';
import { Message } from './messageService';
import { User } from './userService';

export interface Conversation {
  id: string;
  members: Pick<User, 'id' | 'name'>[];
  name: string;
  lastMessage?: Omit<Message, 'conversation'>;
}

export async function createConversation(conversation: Omit<Conversation, 'id'>, userId: string): Promise<Conversation> {
  try {
    const conversationDoc = await ConversationModel.create(conversation)

    return getPopulatedConversation(conversationDoc, userId);
  } catch (err) {
    throw err;
  }
}

export async function getConversationById(id: string, userId: string): Promise<Conversation | null> {
  try {
    const conversationDoc = await ConversationModel.findById(id);

    return conversationDoc && getPopulatedConversation(conversationDoc, userId);
  } catch (err) {
    throw err;
  }
}

export async function getConversationsByMember(memberId: string): Promise<Conversation[]> {
  try {
    const conversationDocs = await ConversationModel.find({ members: memberId }).sort({ updatedAt: 'desc' })
      .populate('members', 'name')
      .populate({
        path: 'lastMessage',
        select: '-conversation',
        populate: {
          path: 'sender',
          select: 'name'
        }
      });

    return conversationDocs.map((conversationDoc: ConversationDocument) => getConversationWithName(conversationDoc.toJSON(), memberId));
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

async function getPopulatedConversation(conversationDoc: ConversationDocument, userId: string): Promise<Conversation> {
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

  return getConversationWithName(conversationDoc.toJSON(), userId);
}

function getConversationWithName(conversation: Omit<Conversation, 'name'> & { name?: string }, userId: string): Conversation {
  return {
    ...conversation,
    name: conversation.name || conversation.members.reduce((acc: string[], member) => {
      if (member.id != userId) {
        acc.push(member.name.first);
      }

      return acc;
    }, []).join(', ')
  }
}
