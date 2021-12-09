export enum TokenType {
  Access = 'AccessToken',
  Refresh = 'RefreshToken',
}

export enum Roles {
  Admin = 'Admin',
  User = 'User',
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
