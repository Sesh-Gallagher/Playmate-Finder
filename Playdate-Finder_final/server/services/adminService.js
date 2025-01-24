};/**
 * Closes the Redis list of admin notifications, keeping the last 100 entries.
 * This function is called after successfully sending an admin notification to ensure the notification cache is properly maintained.
 */
import { getDb } from '../config/database.js';
import { redis } from '../config/database.js';
import logger from '../config/logger.js';
import { ObjectId } from 'mongodb';

export const adminService = {
  async validateProfileData(data) {
    const requiredFields = ['name', 'age', 'interests'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    if (data.age < 4 || data.age > 12) {
      throw new Error('Age must be between 4 and 12');
    }

    return true;
  },

  async ensureDataIntegrity(profileId, updates) {
    const db = getDb();
    const session = db.client.startSession();

    try {
      await session.withTransaction(async () => {
        // Validate if the profile exists //
        const profile = await db.collection('profiles').findOne(
          { _id: new ObjectId(profileId) },
          { session }
        );

        if (!profile) {
          throw new Error('Profile not found');
        }

        // Store backup of original data and timestamp //
        await db.collection('profile_history').insertOne({
          profileId: new ObjectId(profileId),
          previousData: profile,
          updatedAt: new Date()
        }, { session });

        // Perform the update and store the timestamp //
        await db.collection('profiles').updateOne(
          { _id: new ObjectId(profileId) },
          { $set: updates },
          { session }
        );
      });

      return true;
    } catch (error) {
      logger.error('Data integrity error:', error);
      throw error;
    } finally {
      await session.endSession();
    }
  },

  async logAdminAction(adminId, action, details) {
    const db = getDb();

    await db.collection('admin_logs').insertOne({
      adminId: new ObjectId(adminId),
      action,
      details,
      timestamp: new Date()
    });
  },

  async sendAdminNotification(message, adminId) {
    try {
      // Store notification in database when configured //
      const db = getDb();
      await db.collection('admin_notifications').insertOne({
        adminId: new ObjectId(adminId),
        message,
        read: false,
        createdAt: new Date()
      });

      // Cache notification for quick access and cleanup //
      const cacheKey = `admin:${adminId}:notifications`;
      await redis.lpush(cacheKey, JSON.stringify({
        message,
        timestamp: new Date()
      }));
      await redis.ltrim(cacheKey, 0, 99); // Keep last 100 notifications //

      return true;
    } catch (error) {
      logger.error('Error sending admin notification:', error);
      throw error;
    }
  },

  async optimizeDatabase() {
    const db = getDb();

    try {
      // Clean up old logs and notifications //
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      await db.collection('admin_logs').deleteMany({
        timestamp: { $lt: thirtyDaysAgo }
      });

      // Archive old notifications if not already done //
      await db.collection('admin_notifications').updateMany(
        {
          createdAt: { $lt: thirtyDaysAgo },
          archived: { $ne: true }
        },
        {
          $set: { archived: true }
        }
      );

      // Create indexes for frequently queried fields and statuses //
      await Promise.all([
        db.collection('profiles').createIndex({ status: 1 }),
        db.collection('profiles').createIndex({ name: 1 }),
        db.collection('reports').createIndex({ status: 1 }),
        db.collection('admin_logs').createIndex({ timestamp: 1 }),
        db.collection('admin_notifications').createIndex({ adminId: 1, read: 1 })
      ]);

      return true;
    } catch (error) {
      logger.error('Database optimization error:', error);
      throw error;
    }
  }
};
