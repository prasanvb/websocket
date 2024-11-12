import express, { Request, Response } from 'express';

const app = express();
const port = 5050;

// Global middlewares
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
