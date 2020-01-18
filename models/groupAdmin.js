const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupAdminSchema = new Schema({
  name: {type: String, required: true},
  groupAdmin: {type: Boolean, required: true}
})

module.exports = mongoose.model('GroupAdmin', groupAdminSchema)