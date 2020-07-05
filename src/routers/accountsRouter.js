import express from 'express';

const accountsRouter = express();

/**
 * Deposit a value in a account
 * body: {agency, account, value}
 * return: {balance}
 */
app.post('/deposit', (req, res) => {
  // DONE: Not implemented
  res.send({ sucess: 'true' });
});

/**
 * Withdraw a value from a account
 * body: {agency, account, value
 * return: {balance}
 */
app.post('/withdraw', (req, res) => {
  // TODO: Not implemented
});

/**
 * Get current balance
 * return: {balance}
 */
app.get('/balance/:agency/:account', (req, res) => {
  // TODO: Not implemented
});

/**
 * Delete a account
 * return: {active-accounts}
 */
app.delete('/account/:agency/:account', (req, res) => {
  // TODO: Not implemented
});

/**
 * Transfer between accounts
 * body: {origin-account, target-account, value}
 * return: {origin-account-balance}
 */
app.post('/transfer', (req, res) => {
  // TODO: Not implemented
});

/**
 * Get average account balance for an agency
 * return: {average-balance}
 */
app.get('/balance-average/:agency', (req, res) => {
  // TODO: Not implemented
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

export { accountsRouter };
