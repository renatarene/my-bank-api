import express from 'express';
import { Router } from './routers/accountsRouter';

const app = express();

app.use(express.json());
app.use(Router);

app.listen(3000, () => {
  console.log('API iniciada');
});
