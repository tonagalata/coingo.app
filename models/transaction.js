const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  stripeToken: {
    type: String
  },
  paymentAmount: {
    type: String,
    default: 0,
    min: 100
  },
  payee: [{type: Schema.Types.ObjectId, ref: 'Member'}],
  payer: [{type: Schema.Types.ObjectId, ref: 'Member'}],
}, {
  timestamps: true
});

const groupSchema = new Schema({
  name: { type: String},
  groupMembers: [{
    type: String
  }]
}, {
  timestamps: true
});



module.exports = mongoose.model('Transaction', transactionSchema);