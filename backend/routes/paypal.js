// backend/routes/paypal.js
const express = require('express');
const router = express.Router();
const { client } = require('../config/paypalClient');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

router.post('/create-order', async (req, res) => {
  console.log('TOP of /api/create-order');
  console.log('Received /api/create-order request:', req.body);
  const { amount = '100.00', currency = 'INR' } = req.body;
  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: currency,
        value: amount,
      },
    }],
    application_context: {
      return_url: 'http://localhost:3000/payment-success', // Change to your frontend success page
      cancel_url: 'http://localhost:3000/payment-cancel',  // Change to your frontend cancel page
    }
  });

  try {
    const order = await client().execute(request);
    const approvalUrl = order.result.links.find(link => link.rel === 'approve').href;
    console.log('BOTTOM of /api/create-order');
    res.json({ orderID: order.result.id, approvalUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
});

router.post('/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});

module.exports = router;