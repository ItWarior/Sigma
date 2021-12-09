import { Request, Response } from 'express';
import HttpError from '../errors/http.error';
import * as postService from '../services/post.service';

export async function getPosts(req: Request, res: Response) {
  return res.json(await postService.findPosts());
}

export async function getPostByUserId(req: Request, res: Response) {
  return res.json(await postService.findPostsByUserID(req.params.userId));
}

export async function createPost(req: Request, res: Response) {
  const { session } = res.locals;
  const { text } = req.body as { text: string };

  if (!text.trim()) {
    throw new HttpError(400, 'post is empty');
  }

  return res.json(await postService.addPost(text, session.user._id));
}

export async function updatePost(req: Request, res: Response) {
  const { session } = res.locals;
  const { text } = req.body as { text: string };
  const { postId } = req.params as { postId: string };

  if (!text.trim()) {
    throw new HttpError(400, 'post is empty');
  }

  const foundPost: any = await postService.findPostById(postId);
  if (!foundPost) {
    throw new HttpError(404, 'post is not found');
  }

  if (session.user._id.toString() !== foundPost.userId.toString()) {
    throw new HttpError(400, 'It is not your post');
  }

  return res.json(await postService.updatePostById(postId, text));
}

export async function deletePost(req: Request, res: Response) {
  const { session } = res.locals;
  const { postId } = req.params as { postId: string };

  const foundPost: any = await postService.findPostById(postId);
  if (!foundPost) {
    throw new HttpError(404, 'post is not found');
  }

  if (session.user._id.toString() !== foundPost.userId.toString()) {
    throw new HttpError(400, 'It is not your post');
  }

  return res.json(await postService.deletePostById(postId));
}
