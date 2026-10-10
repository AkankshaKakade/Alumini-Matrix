const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const alumniRoutes = require('./routes/alumni');

connectDB();

const app = express();

// CORS (allow frontend to call backend)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middleware
app.use(express.json()); // parse JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serve uploaded images

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alumni', alumniRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
