const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51HYIPUEs3xaL0CLA9ifTREk7DRPpuL9MdxBbhol6FVL0wcrClC9Vm0zxVxjNn4RPjnA7iJdwAcb8zox8aJoQ5Glu00sYY5u7jY'
);

// api

// app conifg
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// api routes
app.get('/', (request, response) => response.status(200).send('hello world'));

//
app.post('/payments/create', async (request, response) => {
  const total = request.query.total;

  console.log('PAYMENT REQUEST RECIEVED BOOM !!! FOR THIS AMOUNT >>> ', total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: 'usd',
  });

  // ok - created payment
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// listen command
exports.api = functions.https.onRequest(app);

// example api endpoint http://localhost:5001/clone-98d35/us-central1/api
