const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const groupSchema = new Schema({
  name: { type: String, required: true},
  groupAvatar: { type: String },
  groupMembers: [{type: Schema.Types.ObjectId, ref: 'Member', required: true}],
}, {
  timestamps: true
});

module.exports = mongoose.model('Group', groupSchema);