import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http.error';
import jwt from '../services/jwt.service';
import authService from '../services/auth.service';
import Session from '../database/Session';

export default {
  checkAccessToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = authService.parseToken(req);

      const { sessionId }: any = jwt.verifyTokens(token, 'accessToken');

      const foundSession = await Session.findById({ _id: sessionId });

      if (!foundSession) {
        throw new HttpError(400, 'You are not login');
      }

      res.locals = await foundSession.populate('user');
      next();
    } catch (e) {
      next(e);
    }
  },
  checkRefreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = authService.parseToken(req);
      jwt.verifyTokens(token, 'refreshWord');

      const foundToken = await Session.findOne({ refreshToken: token });

      if (!foundToken) {
        throw new HttpError(400, 'Refresh token is wrong');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
