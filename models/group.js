const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const groupSchema = new Schema({
  name: { type: String},
  payeeAvatar: { type: String },
  payerAvatar: { type: String },
  groupMembers: [{type: Schema.Types.ObjectId, ref: 'Member'}],
}, {
  timestamps: true
});

module.exports = mongoose.model('Group', groupSchema);