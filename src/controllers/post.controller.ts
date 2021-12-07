import { Request, Response, NextFunction } from 'express';

import postService from '../services/post.service';
import HttpError from '../errors/http.error';

export default {
  getPostByUserId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await postService.findPostByUserID(req.params.userId);
      res.json(posts);
    } catch (e) {
      next(e);
    }
  },
  createPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const curentUser = res.locals;
      const { text } = req.body as { text: string };

      if (!text.trim()) {
        throw new HttpError(400, 'post is empty');
      }

      res.json(await postService.addPost(text, curentUser.user._id));
    } catch (e) {
      next(e);
    }
  },
  updatePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = res.locals.user;
      const { text } = req.body as { text: string };
      const { postId } = req.params as { postId: string };

      if (!text.trim()) {
        throw new HttpError(400, 'post is empty');
      }

      const foundPost: any = await postService.findPostById(postId);
      if (!foundPost) {
        throw new HttpError(404, 'post is not found');
      }

      if (currentUser._id.toString() !== foundPost.userId.toString()) {
        throw new HttpError(400, 'It is not your post');
      }

      res.json(await postService.updatePostById(postId, text));
    } catch (e) {
      next(e);
    }
  },
  deletePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const curentUser = res.locals.user;
      const { postId } = req.params as { postId: string };

      const foundPost: any = await postService.findPostById(postId);
      if (!foundPost) {
        throw new HttpError(404, 'post is not found');
      }

      if (curentUser._id.toString() !== foundPost.userId.toString()) {
        throw new HttpError(400, 'It is not your post');
      }

      res.json(await postService.deletePostById(postId));
    } catch (e) {
      next(e);
    }
  },
};
