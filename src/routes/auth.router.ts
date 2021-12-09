import express from 'express';
import * as authController from '../controllers/auth.controller';
import * as authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/log-in', authController.login);
router.post('/log-out', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authController.refreshToken);

export default router;
