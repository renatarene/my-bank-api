import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
dotenv.config();
import { Router } from './routers/accountsRouter';

const app = express();

app.use(express.json());
app.use(Router);

app.listen(process.env.PORT, async () => {
  console.log(`API iniciada na porta: ${process.env.PORT}`);
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado com sucesso no banco de dados!');
  } catch (error) {
    console.log(`Erro ao conectar no banco de dados: ${error}`);
  }
});
