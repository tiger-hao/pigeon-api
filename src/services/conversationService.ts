import { ConversationModel, ConversationDocument } from '../models/ConversationModel';

export interface Conversation {
  id: string;
  name: string;
  members: string[];
  lastMessageId?: string;
}

export async function createConversation(conversation: Omit<Conversation, 'id'>): Promise<Conversation> {
  try {
    const conversationDoc = await ConversationModel.create(conversation);

    return {
      id: conversationDoc.id,
      name: conversationDoc.name,
      members: conversationDoc.members,
      lastMessageId: conversationDoc.lastMessageId
    };
  } catch (err) {
    throw err;
  }
}

export async function getConversationById(id: string): Promise<Conversation | null> {
  try {
    const conversationDoc = await ConversationModel.findById(id);

    return conversationDoc && {
      id: conversationDoc.id,
      name: conversationDoc.name,
      members: conversationDoc.members,
      lastMessageId: conversationDoc.lastMessageId
    };
  } catch (err) {
    throw err;
  }
}

export async function getConversationsByMember(memberId: string): Promise<Conversation[]> {
  try {
    const conversationDocs = await ConversationModel.find({ members: memberId });

    return conversationDocs.map((conversationDoc: ConversationDocument) => ({
      id: conversationDoc.id,
      name: conversationDoc.name,
      members: conversationDoc.members,
      lastMessageId: conversationDoc.lastMessageId
    }));
  } catch (err) {
    throw err;
  }
}

export async function setLastMessage(messageId: string, conversationId: string): Promise<void> {
  try {
    await ConversationModel.updateOne({ _id: conversationId }, { lastMessageId: messageId });
  } catch (err) {
    throw err;
  }
}
