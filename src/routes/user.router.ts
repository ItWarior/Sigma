import express from 'express';
import * as userController from '../controllers/user.controller';
import * as authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware.checkAccessToken, userController.createUser);
router.get('/', authMiddleware.checkAccessToken, userController.getUsers);
router.get('/:id', authMiddleware.checkAccessToken, userController.getUser);
router.put('/:id', authMiddleware.checkAccessToken, userController.updateUser);
router.delete('/:id', authMiddleware.checkAccessToken, userController.deleteUser);

export default router;
