import express from 'express';
import userController from '../controllers/user.controller';
import authMiddlewares from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddlewares.checkAccessToken, userController.createUser);
router.get('/', authMiddlewares.checkAccessToken, userController.getUsers);
router.get('/:id', authMiddlewares.checkAccessToken, userController.getUser);
router.put('/:id', authMiddlewares.checkAccessToken, userController.updateUser);
router.delete('/:id', authMiddlewares.checkAccessToken, userController.deleteUser);

export default router;
