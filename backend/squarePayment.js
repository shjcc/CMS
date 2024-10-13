const { Client, Environment } = require('square');
require('dotenv').config();
const crypto = require('crypto');

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const paymentsApi = client.paymentsApi;

async function createPayment(req, res) {
  const { sourceId, amount } = req.body;

  try {
    const response = await paymentsApi.createPayment({
      sourceId: sourceId,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: parseInt(amount),
        currency: 'AUD',
      },
      locationId: process.env.SQUARE_LOCATION_ID,
    });
    res.status(200).json(response.result);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = { createPayment };
