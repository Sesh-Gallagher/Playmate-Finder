import express from 'express';
import { adminController } from '../controllers/adminController.js';
import { authenticateToken, checkAdminRole } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication and admin role check to all routes
router.use(authenticateToken);
router.use(checkAdminRole);

// Metrics and Dashboard
router.get('/metrics', adminController.getMetrics);
router.get('/health', adminController.getSystemHealth);

// Profile Management
router.get('/profiles', adminController.getProfiles);
router.put('/profiles/:id', adminController.updateProfile);

// Content Moderation
router.get('/flagged', adminController.getFlaggedContent);
router.post('/flagged/:id/resolve', adminController.resolveFlaggedContent);

export default router;