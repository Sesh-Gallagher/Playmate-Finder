import jwt from 'jsonwebtoken';
import { redis } from '../config/database.js';
import logger from '../config/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function authenticateToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Check if token is blacklisted
    const isBlacklisted = await redis.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token is invalid' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
}

export async function checkAdminRole(req, res, next) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    logger.error('Admin check error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}