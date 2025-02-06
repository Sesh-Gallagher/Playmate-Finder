/**
 * Imports the Express framework, which is a popular web application framework for Node.js.
 * This import statement is used to access the Express API and functionality within the
 * `server/routes/adminRoutes.js` file.
 */
import express from 'express';
import { adminController } from '../controllers/adminController.js';
import { authenticateToken, checkAdminRole } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication and admin role check to all routes
router.use(authenticateToken);
router.use(checkAdminRole);

// System Health
router.get('/health', adminController.getSystemHealth);

// Metrics and Dashboard
router.get('/metrics', adminController.getMetrics);

// Profile Management
router.get('/profiles', adminController.getProfiles);
router.put('/profiles/:id', adminController.updateProfile);

// Content Moderation
router.get('/flagged', adminController.getFlaggedContent);
router.post('/flagged/:id/resolve', adminController.resolveFlaggedContent);

export default router;
