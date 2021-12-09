import log from '../utils/logger.util';

const local = {
  dbConnectionString: 'mongodb://localhost:27017/Sigma',
  accessTokenSecret: 'default_access_token_secret',
  refreshTokenSecret: 'default_refresh_token_secret',
  port: 3000,
};

const production = {
  ...local,
  dbConnectionString: '',
};

const env = process.env.NODE_ENV;
const config = env === 'production' ? production : local;

log.info(`Configuration was loaded for ${env} environment`);

export default config;
