import { Request } from 'express';
import jwt, { JwtPayload, VerifyOptions } from 'jsonwebtoken';
import config from '../config';
import HttpError from '../errors/http.error';
import { TokenType } from '../interfaces/authentication';
import { UserEntity } from '../interfaces/database';

export function generateRefreshToken(user: UserEntity): string {
  return jwt.sign(user, config.refreshTokenSecret, { expiresIn: '24h' });
}

export function generateAccessToken(sessionId: string): string {
  return jwt.sign({ sessionId }, config.accessTokenSecret, {
    expiresIn: '15m',
  });
}

export function verifyToken(token: string, type: TokenType, options?: VerifyOptions): JwtPayload {
  const secretWord: string = type === TokenType.Access ? config.accessTokenSecret : config.refreshTokenSecret;

  return jwt.verify(token, secretWord, options) as JwtPayload;
}

export function parseAccessToken(req: Request): string {
  const token = String(req.headers.authorization);

  if (token && token.split(' ')[0] === 'Bearer') {
    return token.split(' ')[1];
  }

  throw new HttpError(400, 'Token is empty');
}
