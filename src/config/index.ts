import log from '../utils/logger.util';

const local = {
  dbConnectionString: 'mongodb://localhost:27017/Sigma',
  accessTokenSecret: 'default_access_token_secret',
  refreshTokenSecret: 'default_refresh_token_secret',
  port: 3000,
};

const production = {
  ...local,
  dbConnectionString:
    'mongodb+srv://Proto25:Roter!23433)(@cluster0.reoaw.mongodb.net/Sigma?retryWrites=true&w=majority',
};

const env = 'production';

const config = env === 'production' ? production : local;

log.info(`Configuration was loaded for ${env} environment`);

export default config;
