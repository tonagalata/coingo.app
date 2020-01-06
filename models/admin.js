const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const siteAdminSchema = new Schema({
  name: {type: String, required: true},
  siteAdmin: {type: Boolean, required: true}
})

module.exports = mongoose.model('SiteAdmin', siteAdminSchema)