import { buildApp } from './app.js';

const PORT = Number(process.env.PORT ?? 3000);

const start = async () => {
	const app = await buildApp();

	try {
		// host 0.0.0.0 обязателен внутри Docker — иначе порт не виден снаружи контейнера.
		await app.listen({ port: PORT, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
