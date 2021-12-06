export default {
  emailRegex: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  passwordRegex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,128})/,
  accessTokenSecret: 'superWord',
  refreshToken: 'refreshWord',
  authorization: 'Authorization',
  roles: { user: 'user', admin: 'admin' },
};
