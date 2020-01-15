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
    default: 0,
    min: 100
  },
  payee: {
    type: String
  },
  payer: {
    type: String
  },
  payeeAvatar: {
    type: String
  },
  payeeAvatar: {
    type: String
  }
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
  avatar: {
    type: String,
    enum: [
      "https://img.icons8.com/clouds/50/000000/guest-male.png",
      "https://img.icons8.com/clouds/50/000000/user.png",
      "https://img.icons8.com/bubbles/50/000000/cloud-account-login-female.png",
      "https://img.icons8.com/bubbles/50/000000/cloud-account-login-male.png",
      "https://img.icons8.com/clouds/50/000000/businesswoman.png",
      "https://img.icons8.com/clouds/50/000000/nerd-hair.png",
      "https://img.icons8.com/clouds/50/000000/manager.png",
      "https://img.icons8.com/clouds/50/000000/user-female.png",
      "https://img.icons8.com/bubbles/50/000000/barack-obama.png",
      "https://lh4.googleusercontent.com/-Sh-L8M_MqTk/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcTajoix8Ly77--L6ZhL2QRUS0ZQw/photo.jpg"
    ],
    default: "https://img.icons8.com/bubbles/50/000000/barack-obama.png"
  },
  transaction: [transactionSchema],
  group: {type: Schema.Types.ObjectId, ref: 'Group'},
  groupAdmin: {type: Boolean, default: false},
  Admin: {type: Schema.Types.ObjectId, ref: 'GroupAdmin'},
  siteAdmin: {type: Schema.Types.ObjectId, ref: 'SiteAdmin'},
  googleId: String,
  facebookId: String,
  linkedinId: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);