const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  category: String,
  amount: Number,
  date: Date,
  type: { type: String, enum: ['income', 'expense'] },
  icon: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);