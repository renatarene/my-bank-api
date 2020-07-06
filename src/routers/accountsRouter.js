import express from 'express';
import { accountsModel } from '../model/account';

const app = express();

/**
 * Deposit a value in a account
 * body: {agency, account, value}
 * return: {balance}
 */
app.post('/deposit', async (req, res) => {
  // DONE: implemented
  try {
    const { agency, account, value } = req.body;
    const filter = {
      agencia: agency,
      conta: account,
    };

    const update = {
      $inc: { balance: value },
    };
    const accountUpdated = await accountsModel.findOneAndUpdate(
      filter,
      update,
      { new: true }
    );

    if (accountUpdated === null) {
      res.status(404).send({ message: 'Conta não encontrada' });
      return;
    }

    const { balance } = accountUpdated;
    res.status(200).send({ balance });
  } catch (error) {
    console.log(`Erro ao realizar deposito na conta: ${error}`);
    res.status(500).send({ message: error });
  }
});

/**
 * Withdraw a value from a account
 * body: {agency, account, value
 * return: {balance}
 */
app.post('/withdraw', async (req, res) => {
  // DONE: implemented
  try {
    const { agency, account, value } = req.body;
    const filter = {
      agencia: agency,
      conta: account,
    };

    const update = {
      $inc: { balance: -(value + 1) },
    };
    const accountUpdated = await accountsModel.findOneAndUpdate(
      filter,
      update,
      { new: true }
    );

    if (accountUpdated === null) {
      res.status(404).send({ message: 'Conta não encontrada' });
      return;
    }

    const { balance } = accountUpdated;
    res.status(200).send({ balance });
  } catch (error) {
    console.log(`Erro ao solicitar retirada da conta: ${error}`);
    res.status(500).send({ message: error });
  }
});

/**
 * Get current balance
 * return: {balance}
 */
app.get('/balance/:agency/:account', async (req, res) => {
  // DONE: implemented
  try {
    const { agency, account } = req.params;
    const accountFound = await accountsModel.findOne({
      agencia: agency,
      conta: account,
    });
    if (accountFound === null) {
      res.status(404).send({ message: 'Conta não encontrada' });
      return;
    }

    const { balance } = accountFound;
    res.status(200).send({ balance });
  } catch (error) {
    console.log(`Erro ao buscar saldo da conta: ${error}`);
    res.status(500).send(error);
  }
});

/**
 * Delete a account
 * return: {active_accounts}
 */
app.delete('/account/:agency/:account', async (req, res) => {
  // DONE: implemented
  try {
    const { agency, account } = req.params;
    const filter = {
      agencia: agency,
      conta: account,
    };
    const accountDeleted = await accountsModel.findOneAndDelete(filter);
    if (accountDeleted === null) {
      res.status(404).send({ message: 'Conta não encontrada!' });
      return;
    }
    const totalAccountsActives = await accountsModel.countDocuments({
      agencia: agency,
    });
    res.status(202).send({ active_accounts: totalAccountsActives });
  } catch (error) {
    console.log(`Erro ao excluir conta: ${error}`);
    res.status(500).send(error);
  }
});

/**
 * Transfer between accounts
 * body: {origin_account, target_account, value}
 * return: {origin_account_balance}
 */
app.post('/transfer', async (req, res) => {
  // DONE: implemented
  try {
    const { origin_account, target_account, value } = req.body;
    const originAccount = await accountsModel.findOne({
      conta: origin_account,
    });
    const targetAccount = await accountsModel.findOne({
      conta: target_account,
    });
    if (originAccount === null || targetAccount === null) {
      res.status(400).send({ message: 'Requisição inválida!' });
      return;
    }

    if (originAccount.agencia === targetAccount.agencia) {
      await targetAccount.updateOne({ $inc: { balance: value } });
      await originAccount.updateOne({ $inc: { balance: -value } });

      const originAccountUpdated = await accountsModel.findOne({
        conta: origin_account,
      });
      res
        .status(200)
        .send({ origin_account_balance: originAccountUpdated.balance });
      return;
    }

    await targetAccount.updateOne({ $inc: { balance: value } });
    await originAccount.updateOne({ $inc: { balance: -(value + 8) } });
    const originAccountUpdated = await accountsModel.findOne({
      conta: origin_account,
    });
    res
      .status(200)
      .send({ origin_account_balance: originAccountUpdated.balance });
  } catch (error) {
    console.log(`Erro efetuar transferência: ${error}`);
    res.status(500).send(error);
  }
});

/**
 * Get average account balance for an agency
 * return: {average_balance}
 */
app.get('/balance-average/:agency', async (req, res) => {
  // DONE: implemented
  try {
    const { agency } = req.params;
    console.log(`Agencia: ${agency}`);
    const averageAccountBalance = await accountsModel.aggregate([
      { $match: { agencia: +agency } },
      {
        $group: {
          _id: '$agencia',
          average_balance: { $avg: '$balance' },
        },
      },
    ]);
    if (averageAccountBalance === null || averageAccountBalance.length === 0) {
      res.status(404).send({ message: 'Agência não encontrada' });
    }
    res
      .status(200)
      .send({ average_balance: averageAccountBalance[0].average_balance });
  } catch (error) {
    console.log(`Erro ao pegar saldo médio da conta: ${error}`);
    res.status(500).send(error);
  }
});

/**
 * Get Customers with lower balance
 * body: {limit}
 * return: {agency, account, balance}
 */
app.get('/customer-lower-balance', (req, res) => {
  // TODO: Not implemented
  // TODO: Use the querystring package instead of the body
});

/**
 * Get the richest customers
 * body: {limit}
 * return: {agency, account, name, balance}
 * ordered: {balance: desc, name: asc}
 */
app.get('/richest-customers', (req, res) => {
  // TODO: Not implemented
  // TODO: Use the querysting package instead of the body
});

/**
 * transfer the client with the highest account balance
 * from each agency to the private agency agency = 99
 *
 * return {accounts}
 */
app.post('/move-to-private-agency', (req, res) => {
  // TODO: Not implemented
});

export { app as Router };
