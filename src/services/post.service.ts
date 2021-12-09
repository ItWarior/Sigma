import { HydratedDocument } from 'mongoose';
import Post from '../database/post.model';
import { PostEntity } from '../interfaces/database';

export async function findPosts(): Promise<Array<HydratedDocument<PostEntity>>> {
  return Post.find();
}

export async function findPostsByUserID(userId: string): Promise<Array<HydratedDocument<PostEntity>>> {
  return Post.find({ userId });
}

export async function findPostById(_id: string): Promise<HydratedDocument<PostEntity>> {
  return Post.findById({ _id });
}

export async function addPost(text: string, userId: string): Promise<HydratedDocument<PostEntity>> {
  return Post.create({ text, userId });
}

export async function deletePostById(_id: string): Promise<HydratedDocument<PostEntity>> {
  return Post.findByIdAndDelete({ _id });
}

export async function updatePostById(_id: string, text: string): Promise<HydratedDocument<PostEntity>> {
  return Post.findByIdAndUpdate({ _id }, { text });
}
