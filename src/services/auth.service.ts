import { Request } from 'express';
import constants from '../constants';
import HttpError from '../errors/http.error';
import Session from '../database/Session';

export default {
  parseToken: (req: Request): string => {
    const token: string = req.get(constants.authorization);

    if (token && token.split(' ')[0] === 'Bearer') {
      return token.split(' ')[1];
    }
    throw new HttpError(400, 'Token is empty');
  },
  createSession: async (refreshToken: string, userId: string): Promise<object> => Session.create({ refreshToken, user: userId }),

  deleteSession: async (sessionId: string): Promise<object> => Session.findByIdAndDelete({ _id: sessionId }),

  updateSession: async (oldRefreshToken: string, newRefreshToken: string): Promise<object> =>
    Session.updateOne({ refreshToken: oldRefreshToken }, { refreshToken: newRefreshToken }),

  findSessionByRefreshToken: async (refreshToken: string): Promise<object> => Session.findOne({ refreshToken }),
};
