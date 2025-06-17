const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../uploads/avatars');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.user.id + '-' + Date.now() + ext);
  }
});
const upload = multer({ storage });

// GET /api/user/:id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Update user profile with avatar upload
router.put('/:id', auth, upload.single('avatar'), async (req, res) => {
  if (req.user.id !== req.params.id) return res.status(403).json({ error: "Forbidden" });
  const update = {
    income: req.body.income,
    expenses: req.body.expenses
  };
  if (req.file) {
    // Save relative path to avatar
    update.avatar = `/uploads/avatars/${req.file.filename}`;
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true }
  ).select('-password');
  res.json(user);
});

// Serve uploaded files statically
router.use('/uploads/avatars', express.static(path.join(__dirname, '../uploads/avatars')));

module.exports = router;