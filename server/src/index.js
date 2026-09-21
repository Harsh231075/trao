import express from 'express';
import cors from 'cors';
import config from './config/env.js';
import { connectDB } from './db/connection.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import kitsRoutes from './routes/kits.routes.js';
import generationRoutes from './routes/generation.routes.js';
import builderRoutes from './routes/builder.routes.js';
import practiceRoutes from './routes/practice.routes.js';
import scheduleRoutes from './routes/schedule.routes.js';

const app = express();

// Middleware
app.use(cors({
  origin: config.clientUrl,
  credentials: true,
}));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Root info
app.get('/', (req, res) => {
  res.json({
    name: 'Trao AI Interview Prep Kit API',
    status: 'running',
    version: '1.0.0',
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/kits', kitsRoutes);
app.use('/api/kits', generationRoutes);
app.use('/api/kits', builderRoutes);
app.use('/api/kits', practiceRoutes);
app.use('/api/kits', scheduleRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Endpoint not found: ${req.method} ${req.path}`, code: 'NOT_FOUND' });
});

// Global error handler
app.use(errorHandler);

// Start server after DB connection
async function startServer() {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`🚀 Trao Server is running on http://localhost:${config.port}`);
      console.log(`🔗 Client allowed origin: ${config.clientUrl}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
