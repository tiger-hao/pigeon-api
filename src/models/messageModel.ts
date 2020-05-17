import { model, Document, Schema } from 'mongoose';
import { Message } from '../services/messageService';

export type MessageDocument = Omit<Message, 'id'> & Document;

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: new Date(),
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  }
);

export const MessageModel = model<MessageDocument>('Message', messageSchema);
