import mongoose from 'mongoose';

const accountsSchema = mongoose.Schema({
  agencia: {
    type: Number,
    require: true,
  },
  conta: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
    validate(value) {
      if (value < 0)
        throw new Error('Valor negativo para o saldo nao permitido');
    },
  },
});

const accountsModel = mongoose.model('account', accountsSchema, 'accounts');

export { accountsModel };
