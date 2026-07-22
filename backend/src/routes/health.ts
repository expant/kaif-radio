import type { FastifyInstance } from 'fastify';
import { startedAt } from '../appMeta.js';
import { getStationsMeta } from '../stationStore.js';

// «Сервис жив» + маркеры состояния: когда стартовал процесс (свежий код или
// нет) и в каком состоянии каталог станций (прогрет ли, когда обновлялся).
export const healthRoutes = async (app: FastifyInstance): Promise<void> => {
	app.get('/health', async () => ({
		status: 'ok',
		startedAt,
		stations: getStationsMeta(),
	}));
};
