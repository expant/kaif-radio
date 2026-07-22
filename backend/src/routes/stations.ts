import type { FastifyInstance } from 'fastify';
import { getStationsByGenre, getStationsByUuids } from '../stationStore.js';
import type { StationsQuery, ByUuidsQuery } from './types.js';

export const stationsRoutes = async (app: FastifyInstance): Promise<void> => {
	app.get('/stations', async (request, reply) => {
		const { genre, page } = request.query as StationsQuery;

		if (!genre) {
			return reply.code(400).send({ error: 'genre is required' });
		}

		return getStationsByGenre(genre, Number(page) || 1);
	});

	app.get('/stations/by-uuids', async (request, reply) => {
		const { ids } = request.query as ByUuidsQuery;

		if (!ids) {
			return reply.code(400).send({ error: 'ids is required' });
		}

		const uuids = ids.split(',').filter(Boolean);

		return getStationsByUuids(uuids);
	});
};
