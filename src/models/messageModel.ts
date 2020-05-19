import { model, Document, Schema } from 'mongoose';

export interface MessageDocument extends Document {
  conversation: string;
  sender: string;
  createdAt: string;
  text: string;
}

export const messageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: new Date(),
      required: true
    },
    text: {
      type: String,
      required: true,
      trim: true
    }
  }
);

messageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

export const MessageModel = model<MessageDocument>('Message', messageSchema);
