import { connect, Mongoose } from 'mongoose';
import config from '../config';
import log from '../utils/logger.util';

export default function run(): Promise<Mongoose> {
  log.info(`Connecting to the database ${config.dbConnectionString}`);
  return connect(config.dbConnectionString);
}
