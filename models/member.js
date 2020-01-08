const mongoose = require('mongoose');

/*
The factSchema is used to embedded docs in as student doc.
There is no model and no 'facts' collection
*/

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  stripeToken: {
    type: String
  },
  paymentAmount: {
    type: String,
    default: 0
  },

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

const memberSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  transaction: [transactionSchema],
  group: [groupSchema],
  groupAdmin: {type: Boolean, default: false},
  Admin: {type: Schema.Types.ObjectId, ref: 'GroupAdmin'},
  siteAdmin: [{type: Schema.Types.ObjectId, ref: 'SiteAdmin'}],
  googleId: String,
  facebookId: String,
  linkedinId: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);