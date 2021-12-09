import { Request, Response } from 'express';
import HttpError from '../errors/http.error';
import { TokenType } from '../interfaces/authentication';
import * as jwtService from '../services/jwt.service';
import * as sessionService from '../services/session.service';
import * as userService from '../services/user.service';
import signInValidator from '../validators/auth.validator';
import normalizeUser from '../utils/user.util';

export async function login(req: Request, res: Response) {
  const { error } = signInValidator.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }

  const user = await userService.findUserByQuery(req.body);
  if (!user) {
    throw new HttpError(400, 'Your password or email are wrong');
  }
  const normUser = normalizeUser(user);
  const newSession = await sessionService.createSession(normUser);

  return res.json({ ...newSession, ...normUser });
}

export async function logout(req: Request, res: Response) {
  const sessionId = res.locals.session._id;
  await sessionService.deleteSession(sessionId);

  return res.send();
}

export async function refreshToken(req: Request, res: Response) {
  const access = jwtService.parseAccessToken(req);
  const refresh = String(req.headers.refreshtoken);

  if (!access || !refresh) {
    throw new HttpError(400, 'AccessToken and RefreshToken are required');
  }

  const { sessionId } = jwtService.verifyToken(access, TokenType.Access, { ignoreExpiration: true }) as {
    sessionId: string;
  };

  return res.json(await sessionService.refreshSession(sessionId, refresh));
}
