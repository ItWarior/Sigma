import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.post('/log-in', authController.login);
router.post('/log-out', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authController.refreshToken);

export default router;
