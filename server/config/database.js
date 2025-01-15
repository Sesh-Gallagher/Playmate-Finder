import pkg from 'pg';
const { Pool } = pkg;
import Redis from 'ioredis';

// PostgreSQL connection
export const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'playmate',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
});

// Redis connection
export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
});

// Test database connections
export async function testConnections() {
  try {
    await pool.query('SELECT NOW()');
    console.log('PostgreSQL connected');
    
    await redis.ping();
    console.log('Redis connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}
