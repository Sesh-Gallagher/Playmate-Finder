import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from './logger.js';

let mongod = null;
let db = null;

export async function connectMongo() {
  try {
    // Create MongoDB Memory Server
    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();

    // Connect to in-memory database
    const client = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });

    db = client.db();
    logger.info('Connected to MongoDB Memory Server');

    // Initialize with some sample data if needed
    await initializeDatabase();

    return db;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    throw error;
  }
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectMongo() first.');
  }
  return db;
}

// Mock Redis functionality for development
class MockRedis {
  constructor() {
    this.store = new Map();
    logger.info('Mock Redis initialized');
  }

  async set(key, value, expiry = null) {
    this.store.set(key, value);
    if (expiry) {
      setTimeout(() => this.store.delete(key), expiry * 1000);
    }
    return 'OK';
  }

  async get(key) {
    return this.store.get(key);
  }

  async del(key) {
    this.store.delete(key);
    return 1;
  }

  async ping() {
    return 'PONG';
  }
}

export const redis = new MockRedis();

// Initialize database with sample data
async function initializeDatabase() {
  try {
    // Create collections
    await db.createCollection('profiles');
    await db.createCollection('events');
    await db.createCollection('reports');
    await db.createCollection('admin_logs');

    // Create indexes
    await db.collection('profiles').createIndex({ email: 1 }, { unique: true });
    await db.collection('profiles').createIndex({ status: 1 });
    await db.collection('events').createIndex({ date: 1 });
    await db.collection('reports').createIndex({ status: 1 });

    logger.info('Database initialized with collections and indexes');
  } catch (error) {
    logger.error('Error initializing database:', error);
    throw error;
  }
}

// Test database connections with retries
export async function testConnections(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      if (!db) {
        await connectMongo();
      }
      await redis.ping();
      logger.info('All database connections established');
      return true;
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      logger.warn(`Connection attempt ${i + 1} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}