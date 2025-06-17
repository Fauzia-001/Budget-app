const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  password: String,
  income: Number,
  expenses: Number
});

module.exports = mongoose.model('User', UserSchema);