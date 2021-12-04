import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req: Request, res: Response): void => {
  console.log('test');
  res.json('test is ok');
});

app.listen(3000, (): void => {
  console.log('listening... 3000');
});
