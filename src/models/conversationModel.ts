import { model, Document, Schema } from 'mongoose';
import { MessageDocument, messageSchema } from './messageModel';

export interface ConversationDocument extends Document {
  name: string;
  members: string[];
  lastMessage?: string;
}

export const conversationSchema = new Schema(
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
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  }
);

conversationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

export const ConversationModel = model<ConversationDocument>('Conversation', conversationSchema);
