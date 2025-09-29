require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use('/api/analytics', analyticsRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
