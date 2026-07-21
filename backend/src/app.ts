import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { healthRoutes } from './routes/health.js';

// Собирает и настраивает приложение, но не запускает прослушивание —
// так его удобно и стартовать (index.ts), и позже тестировать.
export const buildApp = async (): Promise<FastifyInstance> => {
	const app = Fastify({ logger: true });

	// CORS пока открыт для всех — на этапе продакшена сузим до нашего фронта.
	await app.register(cors);
	await app.register(healthRoutes);

	return app;
};
