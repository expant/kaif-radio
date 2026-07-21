import type { FastifyInstance } from 'fastify';
import { fetchStationsByGenre } from '../radioBrowser/client.js';
import type { StationsQuery } from './types.js';

export const stationsRoutes = async (app: FastifyInstance): Promise<void> => {
	app.get('/stations', async (request, reply) => {
		const { genre, page } = request.query as StationsQuery;

		if (!genre) {
			return reply.code(400).send({ error: 'genre is required' });
		}

		try {
			return await fetchStationsByGenre(genre, Number(page) || 1);
		} catch {
			return reply.code(502).send({ error: 'station source unavailable' });
		}
	});
};
