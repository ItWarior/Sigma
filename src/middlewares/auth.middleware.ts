import { NextFunction, Request, Response } from 'express';
import Session from '../database/session.model';
import HttpError from '../errors/http.error';
import { TokenType } from '../interfaces/authentication';
import * as jwtService from '../services/jwt.service';

export async function checkAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = jwtService.parseAccessToken(req);

  const { sessionId } = jwtService.verifyToken(token, TokenType.Access) as {
    sessionId: string;
  };

  const foundSession = await Session.findById({ _id: sessionId }, null, { populate: 'user' });
  if (!foundSession) {
    throw new HttpError(401, 'You are not signed in');
  }

  res.locals.session = foundSession.toObject();
  return next();
}
