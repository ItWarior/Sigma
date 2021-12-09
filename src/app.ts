import express, { Application, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import config from './config';
import connect from './database/connection';
import swaggerDoc from './docs/swagger.json';
import HttpError from './errors/http.error';
import authRouter from './routes/auth.router';
import postRouter from './routes/post.router';
import userRouter from './routes/user.router';
import log from './utils/logger.util';

connect()
  .then(() => log.info('Connected to the database'))
  .catch(err => log.error(err));

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/auth', authRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  log.error(err);
  log.error(err.stack);
  if (err instanceof HttpError) {
    return res.status(err.status || 500).json({ message: err.message || 'Unknown error' });
  }
  return res.status(500).json({ message: err.message });
});

app.listen(config.port, (): void => {
  log.info(`Listening port ${config.port}`);
});
