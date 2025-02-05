import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { testConnections } from './config/database.js';
import adminRoutes from './routes/adminRoutes.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import logger from './config/logger.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

// WebSocket server
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  logger.info('WebSocket client connected');
  ws.on('message', (message) => {
    logger.info('Received:', message);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

// Start server with connection retries
async function startServer() {
  try {
    await testConnections(3); // Try to connect 3 times
    
    const server = app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });

    // Integrate WebSocket server
    server.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });

    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
