const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// GET /api/transactions?userId=...
router.get('/', auth, async (req, res) => {
  const txs = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
  res.json(txs);
});

// POST /api/transactions
router.post(
  '/',
  auth,
  [
    body('name').notEmpty(),
    body('category').notEmpty(),
    body('amount').isNumeric(),
    body('date').isISO8601(),
    body('type').isIn(['income', 'expense'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const tx = new Transaction({ ...req.body, userId: req.user.id });
    await tx.save();
    res.status(201).json(tx);
  }
);

module.exports = router;