import jwt from 'jsonwebtoken';
import constants from '../constants';
import HttpError from '../errors/http.error';

export default {
  generateRefreshToken: (user: object) => jwt.sign({ ...user }, constants.refreshToken, { expiresIn: '31d' }),
  generateAccessToken: (sessionId: string) => jwt.sign({ sessionId }, constants.accessTokenSecret, { expiresIn: '15m' }),

  verifyTokens: (token: string, tokenType = 'accessToken') => {
    try {
      const secretWord: string = tokenType === 'accessToken' ? constants.accessTokenSecret : constants.refreshToken;

      return jwt.verify(token, secretWord);
    } catch (e) {
      throw new HttpError(401, 'Token is invalid');
    }
  },
};
