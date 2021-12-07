import { model, Schema } from 'mongoose';
import { PostInterface } from '../interfaces/interfaces.shema';

const postSchema = new Schema<PostInterface>(
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
