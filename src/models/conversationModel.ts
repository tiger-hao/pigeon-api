import { model, Document, Schema } from 'mongoose';
import { Conversation } from '../services/conversationService';

export type ConversationDocument = Omit<Conversation, 'id'> & Document;

const conversationSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    members: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      required: true
    },
    lastMessageId: {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  }
);

export const ConversationModel = model<ConversationDocument>('Conversation', conversationSchema);
