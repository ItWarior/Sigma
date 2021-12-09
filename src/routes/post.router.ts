import express from 'express';

import * as postController from '../controllers/post.controller';
import * as authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', postController.getPosts);
router.post('/', authMiddleware.checkAccessToken, postController.createPost);
router.get('/:userId', authMiddleware.checkAccessToken, postController.getPostByUserId);
router.put('/:postId', authMiddleware.checkAccessToken, postController.updatePost);
router.delete('/:postId', authMiddleware.checkAccessToken, postController.deletePost);

export default router;
