import { NextFunction, Request, Response } from 'express';

import jwt from '../services/jwt.service';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import userNormalizator from '../utils/user.util';
import HttpError from '../errors/http.error';
import signInValidator from '../validators/auth.validator';

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = signInValidator.validate(req.body);

      if (error) {
        throw new HttpError(404, error.message);
      }

      const user: any = await userService.userByParam(req.body);
      if (!user) {
        throw new HttpError(400, 'Your password or email are wrong');
      }

      const normUser: any = userNormalizator(user);

      const refreshToken = jwt.generateRefreshToken(normUser);

      const session: any = await authService.createSession(refreshToken, user.id);

      const accessToken = jwt.generateAccessToken(session._id);

      res.json({ accessToken, refreshToken, ...normUser });
    } catch (e) {
      next(e);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionId = res.locals;

      await authService.deleteSession(sessionId._id);

      res.json('logout');
    } catch (e) {
      next(e);
    }
  },
  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const oldToken: string = authService.parseToken(req);
      const user: object = req.body;

      const refreshToken = jwt.generateRefreshToken(user);

      await authService.updateSession(oldToken, refreshToken);

      const newSession: any = await authService.findSessionByRefreshToken(refreshToken);

      const accessToken = jwt.generateAccessToken(newSession._id);

      res.json({ accessToken, refreshToken, ...user });
    } catch (e) {
      next(e);
    }
  },
};
