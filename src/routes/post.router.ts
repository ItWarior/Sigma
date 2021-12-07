import express from 'express';

import postController from '../controllers/post.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware.checkAccessToken, postController.createPost);
router.get('/:userId', postController.getPostByUserId);
router.put('/:postId', authMiddleware.checkAccessToken, postController.updatePost);
router.delete('/:postId', authMiddleware.checkAccessToken, postController.deletePost);

export default router;
