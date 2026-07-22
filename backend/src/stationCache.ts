import { redis } from './redisClient.js';
import type { Station } from './radioBrowser/types.js';

const CATALOG_KEY = 'stations:catalog';

// Прошлый каталог из Redis. Нет данных или Redis недоступен — null; вызывающий
// просто пойдёт за свежими станциями в radio-browser.
export const loadCatalog = async (): Promise<Station[] | null> => {
	try {
		const raw = await redis.get(CATALOG_KEY);

		return raw ? (JSON.parse(raw) as Station[]) : null;
	} catch (err) {
		console.error('Чтение каталога из Redis не удалось:', err);

		return null;
	}
};

// Сохранить свежий каталог. Ошибка не критична — в памяти данные уже есть,
// в следующий refresh запись повторится.
export const saveCatalog = async (stations: Station[]): Promise<void> => {
	try {
		await redis.set(CATALOG_KEY, JSON.stringify(stations));
	} catch (err) {
		console.error('Запись каталога в Redis не удалась:', err);
	}
};
