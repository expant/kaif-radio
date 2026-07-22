import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { healthRoutes } from './routes/health.js';
import { stationsRoutes } from './routes/stations.js';

export const buildApp = async (): Promise<FastifyInstance> => {
	const app = Fastify({ logger: true });

	await app.register(cors);
	await app.register(healthRoutes);
	await app.register(stationsRoutes);

	return app;
};
