const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads/avatars', express.static(path.join(__dirname, 'uploads/avatars')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/transactions', require('./routes/transactions'));

app.listen(PORT, () => {
  console.log('listening to port:', PORT);
});