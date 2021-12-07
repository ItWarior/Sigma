import express, { Application, NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import connect from './database/conection';

import authRouter from './routes/auth.router';
import usersRouter from './routes/user.router';
import postRouter from './routes/post.router';
import HttpError from './errors/http.error';
import swaggerDoc from './docs/swagger.json';

connect().catch((err): void => console.log(err));

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mainErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof HttpError) {
    res.status(err.status || 500).json({ message: err.message || 'Unknown error' });
  } else {
    res.status(500).json({ message: err });
  }
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/users', usersRouter);
app.use('/posts', postRouter);
app.use('/auth', authRouter);
app.use(mainErrorHandler);

app.listen(3000, (): void => {
  console.log('listening... 3000');
});
