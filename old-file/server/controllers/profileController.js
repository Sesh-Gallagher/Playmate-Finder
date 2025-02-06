/**
 * Retrieves the database connection instance.
 * This function is used to access the database connection throughout the application.
 */
import { getDb } from '../config/database.js';
import { redis } from '../config/database.js';
import logger from '../config/logger.js';
import { ObjectId } from 'mongodb';

const CACHE_TTL = 3600; // 1 hour

export const profileController = {
  async create(req, res) {
    const db = getDb();
    const session = db.client.startSession();

    try {
      await session.withTransaction(async () => {
        const { name, email, age, interests } = req.body;

        const result = await db.collection('profiles').insertOne({
          name,
          email,
          age,
          interests,
          createdAt: new Date()
        }, { session });

        res.status(201).json({ id: result.insertedId });
      });
    } catch (error) {
      logger.error('Profile creation error:', error);
      res.status(500).json({ message: 'Failed to create profile' });
    } finally {
      await session.endSession();
    }
  },

  async get(req, res) {
    try {
      const { id } = req.params;

      // Check cache first
      const cached = await redis.get(`profile:${id}`);
      if (cached) {
        return res.json(JSON.parse(cached));
      }

      const db = getDb();
      const profile = await db.collection('profiles').findOne({
        _id: new ObjectId(id)
      });

      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      // Cache the result
      await redis.setex(`profile:${id}`, CACHE_TTL, JSON.stringify(profile));

      res.json(profile);
    } catch (error) {
      logger.error('Profile retrieval error:', error);
      res.status(500).json({ message: 'Failed to retrieve profile' });
    }
  },

  async update(req, res) {
    const db = getDb();
    const session = db.client.startSession();

    try {
      await session.withTransaction(async () => {
        const { id } = req.params;
        const { name, email, age, interests } = req.body;

        const result = await db.collection('profiles').updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              name,
              email,
              age,
              interests,
              updatedAt: new Date()
            }
          },
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
      logger.error('Profile update error:', error);
      res.status(500).json({ message: 'Failed to update profile' });
    } finally {
      await session.endSession();
    }
  },

  async delete(req, res) {
    const db = getDb();
    const session = db.client.startSession();

    try {
      await session.withTransaction(async () => {
        const { id } = req.params;

        const result = await db.collection('profiles').deleteOne(
          { _id: new ObjectId(id) },
          { session }
        );

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Profile not found' });
        }

        // Invalidate cache
        await redis.del(`profile:${id}`);

        res.json({ message: 'Profile deleted successfully' });
      });
    } catch (error) {
      logger.error('Profile deletion error:', error);
      res.status(500).json({ message: 'Failed to delete profile' });
    } finally {
      await session.endSession();
    }
  }
};
