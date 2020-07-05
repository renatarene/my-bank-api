import express from 'express';
import { accountsRouter } from './routers/accountsRouter';

const app = express();

app.use(express.json());
app.use(accountsRouter);

app.listen(3000, () => {
  console.log('API iniciada');
});
