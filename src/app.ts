import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import professionalRoutes from './routes/professionals';
import appointmentRoutes from './routes/appointments';
import paymentRoutes from './routes/payments';
import { errorHandler } from './middleware/error.middleware';
import { logger } from './utils/logger';

const app = express();

// CORS configuration (development-friendly)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://yourdomain.com'] // Replace with your domain
    : ['http://localhost:3000', 'http://localhost:3001'], // For development
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);

app.use(errorHandler);

app.get('/api/health', (_req, res) => {
  logger.info('Health check OK');
  res.json({ status:'OK' });
});

export default app;
