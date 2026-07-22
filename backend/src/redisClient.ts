import { Redis } from 'ioredis';

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';

export const redis = new Redis(REDIS_URL, {
	commandTimeout: 5000,
});

redis.on('error', (err: Error) => {
	console.error('Redis:', err.message);
});
