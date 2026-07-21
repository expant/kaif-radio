import type { FastifyInstance } from 'fastify';

// Проверка «сервис жив»: быстрый ответ без реальной работы —
// для мониторинга, Docker healthcheck и проверки после деплоя.
export const healthRoutes = async (app: FastifyInstance): Promise<void> => {
	app.get('/health', async () => ({ status: 'ok' }));
};
