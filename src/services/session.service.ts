import jwtService from './jwt.service';
import userNormalizator from '../utils/user.util';
import authService from './auth.service';

export default {
  refreshSession: async (refreshToken: string, foundSession: any) => {
    jwtService.verifyToken(refreshToken, 'refreshToken');

    const user = userNormalizator(foundSession.user);

    const newRefreshToken: string = jwtService.generateRefreshToken(user);

    await authService.updateSession(refreshToken, newRefreshToken);

    const newSession: any = await authService.findSessionByRefreshToken(newRefreshToken);

    const newAccessToken = jwtService.generateAccessToken(newSession._id);

    return { newAccessToken, newRefreshToken, ...user };
  },
  accessSession: async (user: any) => {
    const normUser: any = userNormalizator(user);

    const refreshToken = jwtService.generateRefreshToken(normUser);

    const session: any = await authService.createSession(refreshToken, user.id);

    const accessToken = jwtService.generateAccessToken(session._id);

    return { accessToken, refreshToken, ...normUser };
  },
};
