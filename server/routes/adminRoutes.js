import express from 'express';
import { authenticateToken, checkAdminRole } from '../middleware/auth.js';
import { profileController } from '../controllers/profileController.js';

const router = express.Router();

// Protect all admin routes
router.use(authenticateToken);
router.use(checkAdminRole);

// Profile management routes
router.post('/profiles', profileController.create);
router.get('/profiles/:id', profileController.get);
router.put('/profiles/:id', profileController.update);
router.delete('/profiles/:id', profileController.delete);

export default router;
