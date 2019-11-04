import { Schema } from 'mongoose';

const schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    }
  }
);

export default schema;
