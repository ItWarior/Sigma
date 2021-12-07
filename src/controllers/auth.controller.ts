import { NextFunction, Request, Response } from 'express';

import jwtService from '../services/jwt.service';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import HttpError from '../errors/http.error';
import signInValidator from '../validators/auth.validator';
import sessionService from '../services/session.service';

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

      res.json(await sessionService.accessSession(user));
    } catch (e) {
      next(e);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionId = res.locals;

      await authService.signOut(sessionId._id);

      res.json('logout');
    } catch (e) {
      next(e);
    }
  },
  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken: string = authService.parseToken(req);
      const refreshToken = req.headers.refreshtoken.toString();

      if (!accessToken && !refreshToken) {
        throw new HttpError(400, 'AccessToken and RefreshToken are required');
      }
      const { sessionId } = jwtService.verifyWithIgnoreExpiration(accessToken) as { sessionId: string };

      const foundSession: any = await authService.findSessionById(sessionId);
      if (!foundSession) {
        throw new HttpError(400, 'Refresh token is wrong');
      }
      if (foundSession.refreshToken !== refreshToken) {
        throw new HttpError(400, 'tokens are not the same');
      }

      res.json(await sessionService.refreshSession(refreshToken, foundSession));
    } catch (e) {
      next(e);
    }
  },
};
