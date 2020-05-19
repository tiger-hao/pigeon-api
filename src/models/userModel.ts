import { model, Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
}

export const userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        required: true,
        trim: true
      },
      last: {
        type: String,
        required: true,
        trim: true
      }
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  }
);

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

export const UserModel = model<UserDocument>('User', userSchema);
