import { HydratedDocument } from 'mongoose';
import Session from '../database/session.model';
import HttpError from '../errors/http.error';
import { Tokens } from '../interfaces/authentication';
import { SessionEntity, UserEntity } from '../interfaces/database';
import * as jwtService from './jwt.service';
import normalizeUser from '../utils/user.util';

export async function createSession(user: UserEntity): Promise<Tokens> {
  const refreshToken = jwtService.generateRefreshToken(user);
  const session = await Session.create({
    refreshToken,
    user: user._id,
  });
  const accessToken = jwtService.generateAccessToken(session._id);

  return {
    accessToken,
    refreshToken,
  };
}

export async function deleteSession(sessionId: string): Promise<void> {
  await Session.findByIdAndDelete({ _id: sessionId });
}

export async function findSessionById(sessionId: string): Promise<HydratedDocument<SessionEntity>> {
  return Session.findById({ _id: sessionId }).populate('user');
}

export async function refreshSession(sessionId: string, refreshToken: string): Promise<Tokens> {
  const session = await findSessionById(sessionId);

  if (session.refreshToken !== refreshToken) {
    throw new HttpError(403, 'Forbidden');
  }

  const newRefreshToken = jwtService.generateRefreshToken(normalizeUser(session.user));
  const newAccessToken = jwtService.generateAccessToken(session._id);

  session.refreshToken = newRefreshToken;
  await session.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}
