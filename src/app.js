import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

import { Router } from './routers/accountsRouter';

const app = express();

app.use(express.json());
app.use(Router);

app.listen(process.env.PORT, () => {
  console.log('API iniciada');
});
