require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const siteDataRoutes = require('./routes/siteData');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security: Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply security middleware
app.use(helmet()); // Security headers
app.use(limiter); // Rate limiting
app.use(express.json({ limit: '100kb' })); // Body parser with size limit
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Security: Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [];

const corsOptions = {
  origin:
    NODE_ENV === 'production'
      ? (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin) || allowedOrigins.length === 0) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        }
      : 'http://localhost:8080', // Dev frontend origin
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Disable X-Powered-By header (reduce fingerprinting)
app.disable('x-powered-by');

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
connectDB();

// API Routes
app.use('/api/site-data', siteDataRoutes);

// Custom 404 Handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Error Handling Middleware (Security-focused - no stack trace in production)
app.use((err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // If Mongoose not found error, set to 404 and change message
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: NODE_ENV === 'production' ? '🥞' : err.stack, // Only show stack in dev
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
