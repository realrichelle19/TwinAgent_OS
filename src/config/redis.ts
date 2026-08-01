import Redis from 'ioredis';
import { env } from './env.js';

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  lazyConnect: true,
});

redis.on('connect', () => console.error('[Redis] Connected to Redis server'));
redis.on('error', (err) => console.error('[Redis] Connection warning/error:', err.message));

export async function connectRedis() {
  try {
    await redis.connect();
  } catch (error) {
    console.error('[Redis] Operating in fallback mode (Redis disconnected)');
  }
}
