import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { testConnections } from './config/database.js';
import adminRoutes from './routes/adminRoutes.js';
import logger from './config/logger.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);

// WebSocket server for real-time notifications
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Handle incoming messages
    logger.info('Received:', message);
  });
});

// Start server
const server = app.listen(port, async () => {
  try {
    await testConnections();
    logger.info(`Server running on port ${port}`);
  } catch (error) {
    logger.error('Server startup error:', error);
    process.exit(1);
  }
});

// Integrate WebSocket server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
