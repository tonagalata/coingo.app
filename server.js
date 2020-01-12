const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
// Require the Stripe library with a test secret key.
const stripe = require("stripe")(keySecret);
const bodyParser = require("body-parser");
const emoji = require('node-emoji')

require('dotenv').config();
require('./config/database')
require('./config/google')
require('./config/facebook')
require('./config/linkedin')
const port = process.env.LISTENING_PORT

const app = express();

const indexRoutes = require('./routes/index')
const membersRoutes = require('./routes/members')
const groupAdminsRoutes = require('./routes/groupAdmins')
const adminsRoutes = require('./routes/admins')

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(morgan('dev'));
app.use(express.json());
app.use(require('body-parser').urlencoded({
  extended: false
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// app.post("/charge", (req, res) => {
//   let amount = 500;

//   stripe.customers.create({
//     email: req.body.email,
//     card: req.body.id
//   })
//   .then(customer =>
//     stripe.charges.create({
//       amount,
//       description: "Sample Charge",
//       currency: "usd",
//       customer: customer.id
//     }))
//   .then(charge => res.send(charge))
//   .catch(err => {
//     console.log("Error:", err);
//     res.status(500).send({error: "Purchase Failed"});
//   });
// });

app.use('/', indexRoutes);
app.use('/', membersRoutes);
app.use('/', groupAdminsRoutes);
app.use('/', adminsRoutes);

// (async () => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [{
//       name: 'T-shirt',
//       description: 'Comfortable cotton t-shirt',
//       images: ['https://example.com/t-shirt.png'],
//       amount: 500,
//       currency: 'usd',
//       quantity: 1,
//     }],
//     success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
//     cancel_url: 'https://example.com/cancel',
//   });
// })();

// app.get('/payments', (req, res) =>
//   res.render('payments/index', {keyPublishable}))

// app.post("payments/charge", (req, res) => {
//   // console.log(req.body)
//   let amount = 500;
  
//   stripe.customers.create({
//     email: req.body.stripeEmail,
//     source: req.body.stripeToken,
//   })
//   .then(customer =>
//     stripe.charges.create({
//       amount,
//       description: "Sample Charge",
//       currency: "usd",
//       customer: customer.id
//     }))
//   .then(charge => res.render('payments/charge'))
//   .catch(err => {
//     console.log("Error:", err);
//     res.status(500).send({error: "Purchase Failed"});
//   });
// });

app.listen(port, () =>
  console.log(`Express listening on port ${port}`));