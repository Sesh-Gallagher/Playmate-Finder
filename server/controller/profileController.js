import { pool } from '../config/database.js';
import { redis } from '../config/database.js';
import logger from '../config/logger.js';

const CACHE_TTL = 3600; // 1 hour

export const profileController = {
  async create(req, res) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const { name, email, age, interests } = req.body;
      
      const result = await client.query(
        'INSERT INTO profiles (name, email, age) VALUES ($1, $2, $3) RETURNING id',
        [name, email, age]
      );
      
      const profileId = result.rows[0].id;
      
      // Insert interests
      for (const interest of interests) {
        await client.query(
          'INSERT INTO profile_interests (profile_id, interest) VALUES ($1, $2)',
          [profileId, interest]
        );
      }
      
      await client.query('COMMIT');
      res.status(201).json({ id: profileId });
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Profile creation error:', error);
      res.status(500).json({ message: 'Failed to create profile' });
    } finally {
      client.release();
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
      
      const result = await pool.query(
        'SELECT p.*, array_agg(pi.interest) as interests FROM profiles p ' +
        'LEFT JOIN profile_interests pi ON p.id = pi.profile_id ' +
        'WHERE p.id = $1 GROUP BY p.id',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      
      const profile = result.rows[0];
      
      // Cache the result
      await redis.setex(`profile:${id}`, CACHE_TTL, JSON.stringify(profile));
      
      res.json(profile);
    } catch (error) {
      logger.error('Profile retrieval error:', error);
      res.status(500).json({ message: 'Failed to retrieve profile' });
    }
  },

  async update(req, res) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const { id } = req.params;
      const { name, email, age, interests } = req.body;
      
      await client.query(
        'UPDATE profiles SET name = $1, email = $2, age = $3 WHERE id = $4',
        [name, email, age, id]
      );
      
      // Update interests
      await client.query('DELETE FROM profile_interests WHERE profile_id = $1', [id]);
      for (const interest of interests) {
        await client.query(
          'INSERT INTO profile_interests (profile_id, interest) VALUES ($1, $2)',
          [id, interest]
        );
      }
      
      await client.query('COMMIT');
      
      // Invalidate cache
      await redis.del(`profile:${id}`);
      
      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Profile update error:', error);
      res.status(500).json({ message: 'Failed to update profile' });
    } finally {
      client.release();
    }
  },

  async delete(req, res) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const { id } = req.params;
      
      await client.query('DELETE FROM profile_interests WHERE profile_id = $1', [id]);
      await client.query('DELETE FROM profiles WHERE id = $1', [id]);
      
      await client.query('COMMIT');
      
      // Invalidate cache
      await redis.del(`profile:${id}`);
      
      res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Profile deletion error:', error);
      res.status(500).json({ message: 'Failed to delete profile' });
    } finally {
      client.release();
    }
  }
};
