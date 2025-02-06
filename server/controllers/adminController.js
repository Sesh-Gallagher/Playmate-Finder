import { getDb } from '../config/database.js';
import { redis } from '../config/database.js';
import logger from '../config/logger.js';
import { ObjectId } from 'mongodb';

export const adminController = {
  async getMetrics(req, res) {
    try {
      const db = getDb();
      const [
        activeProfiles,
        pendingVerifications,
        flaggedActivities
      ] = await Promise.all([
        db.collection('profiles').countDocuments({ status: 'active' }),
        db.collection('profiles').countDocuments({ status: 'pending' }),
        db.collection('reports').countDocuments({ status: 'pending' })
      ]);

      res.json({
        activeProfiles,
        pendingVerifications,
        flaggedActivities,
        // Add more metrics as needed
      });
    } catch (error) {
      logger.error('Error fetching admin metrics:', error);
      res.status(500).json({ message: 'Failed to fetch metrics' });
    }
  },

  async getProfiles(req, res) {
    try {
      const db = getDb();
      const { status, search } = req.query;
      
      const query = {};
      if (status && status !== 'all') {
        query.status = status;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }

      const profiles = await db.collection('profiles')
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();

      res.json(profiles);
    } catch (error) {
      logger.error('Error fetching profiles:', error);
      res.status(500).json({ message: 'Failed to fetch profiles' });
    }
  },

  async updateProfile(req, res) {
    const session = getDb().client.startSession();

    try {
      await session.withTransaction(async () => {
        const { id } = req.params;
        const updates = req.body;
        
        const result = await getDb().collection('profiles').updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...updates, updatedAt: new Date() } },
          { session }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Profile not found' });
        }

        // Invalidate cache
        await redis.del(`profile:${id}`);

        res.json({ message: 'Profile updated successfully' });
      });
    } catch (error) {
      logger.error('Error updating profile:', error);
      res.status(500).json({ message: 'Failed to update profile' });
    } finally {
      await session.endSession();
    }
  },

  async getSystemHealth(req, res) {
    try {
      const db = getDb();
      const [dbStatus, cacheStatus] = await Promise.all([
        db.admin().ping(),
        redis.ping()
      ]);

      res.json({
        database: dbStatus.ok === 1 ? 'healthy' : 'unhealthy',
        cache: cacheStatus === 'PONG' ? 'healthy' : 'unhealthy',
        timestamp: new Date()
      });
    } catch (error) {
      logger.error('Error checking system health:', error);
      res.status(500).json({ message: 'Failed to check system health' });
    }
  },

  async getFlaggedContent(req, res) {
    try {
      const db = getDb();
      const flaggedContent = await db.collection('reports')
        .find({ status: 'pending' })
        .sort({ createdAt: -1 })
        .toArray();

      res.json(flaggedContent);
    } catch (error) {
      logger.error('Error fetching flagged content:', error);
      res.status(500).json({ message: 'Failed to fetch flagged content' });
    }
  },

  async resolveFlaggedContent(req, res) {
    const session = getDb().client.startSession();

    try {
      await session.withTransaction(async () => {
        const { id } = req.params;
        const { action, notes } = req.body;

        await getDb().collection('reports').updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              status: 'resolved',
              resolution: action,
              notes,
              resolvedAt: new Date(),
              resolvedBy: req.user.id
            }
          },
          { session }
        );

        res.json({ message: 'Report resolved successfully' });
      });
    } catch (error) {
      logger.error('Error resolving flagged content:', error);
      res.status(500).json({ message: 'Failed to resolve flagged content' });
    } finally {
      await session.endSession();
    }
  }
};