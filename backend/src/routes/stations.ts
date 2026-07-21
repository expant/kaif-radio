import type { FastifyInstance } from 'fastify';
import {
	fetchStationsByGenre,
	fetchStationCount,
	fetchStationsByUuids,
} from '../radioBrowser/client.js';
import type { StationsQuery, ByUuidsQuery } from './types.js';

export const stationsRoutes = async (app: FastifyInstance): Promise<void> => {
	app.get('/stations', async (request, reply) => {
		const { genre, page } = request.query as StationsQuery;

		if (!genre) {
			return reply.code(400).send({ error: 'genre is required' });
		}

		try {
			const [stations, totalCount] = await Promise.all([
				fetchStationsByGenre(genre, Number(page) || 1),
				fetchStationCount(genre),
			]);

			return { stations, totalCount };
		} catch {
			return reply.code(502).send({ error: 'station source unavailable' });
		}
	});

	app.get('/stations/by-uuids', async (request, reply) => {
		const { ids } = request.query as ByUuidsQuery;

		if (!ids) {
			return reply.code(400).send({ error: 'ids is required' });
		}

		const uuids = ids.split(',').filter(Boolean);

		try {
			return await fetchStationsByUuids(uuids);
		} catch {
			return reply.code(502).send({ error: 'station source unavailable' });
		}
	});
};
