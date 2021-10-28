import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { apiRouter } from './routes/api';
import { errorHandler } from './middleware/error';
require('dotenv').config();

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // 100 times
});

// Middleware
app.use(cors());

app.use(limiter);
app.set('trust proxy', 1); // limiter using proxy server

// Routes
app.use('/api', apiRouter);

// Error Handler
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
