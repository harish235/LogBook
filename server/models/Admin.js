var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
  name: String,
  mail: String,
  password: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', AdminSchema);