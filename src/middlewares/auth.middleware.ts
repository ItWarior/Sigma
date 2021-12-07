import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http.error';
import jwt from '../services/jwt.service';
import authService from '../services/auth.service';
import Session from '../database/Session';

export default {
  checkAccessToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = authService.parseToken(req);

      const { sessionId } = jwt.verifyToken(token, 'accessToken') as { sessionId: string };

      const foundSession = await Session.findById({ _id: sessionId });

      if (!foundSession) {
        throw new HttpError(401, 'You are not signed in');
      }

      res.locals = await foundSession.populate('user');
      next();
    } catch (e) {
      next(e);
    }
  },
};
