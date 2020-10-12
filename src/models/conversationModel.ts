import { model, Document, Schema } from 'mongoose';
import { MessageDocument, messageSchema } from './messageModel';

export interface ConversationDocument extends Document {
  members: string[];
  name?: string;
  lastMessage?: string;
}

export const conversationSchema = new Schema(
  {
    members: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      required: true
    },
    name: {
      type: String,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: true
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
