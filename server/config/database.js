/**
 * Imports the MongoClient class from the 'mongodb' package.
 * This is used to establish a connection to a MongoDB database.
 */
import { MongoClient } from 'mongodb';

// MongoDB connection // 'mongodb://localhost:27017/playmate'
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/playmate';
let db;

export async function connectMongo() {
  try {
    const client = await MongoClient.connect(mongoUrl);
    db = client.db();
    console.log('MongoDB connected');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectMongo() first.');
  }
  return db;
}

// Mock Redis functionality since Redis is not available
class MockRedis {
  constructor() {
    this.store = new Map();
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

  async lpush(key, value) {
    const list = this.store.get(key) || [];
    list.unshift(value);
    this.store.set(key, list);
    return list.length;
  }

  async ltrim(key, start, stop) {
    const list = this.store.get(key) || [];
    this.store.set(key, list.slice(start, stop + 1));
    return 'OK';
  }

  async ping() {
    return 'PONG';
  }
}

export const redis = new MockRedis();

// Test database connections //
export async function testConnections() {
  try {
    await connectMongo();
    await redis.ping();
    console.log('Mock Redis connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}
