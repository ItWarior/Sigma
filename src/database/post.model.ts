import { model, Schema } from 'mongoose';
import { PostEntity } from '../interfaces/database';

const postSchema = new Schema<PostEntity>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { timestamps: true },
);

const Post = model('post', postSchema);
export = Post;
