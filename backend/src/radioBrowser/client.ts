// Единственное место, знающее про radio-browser. Отдаёт весь рабочий список —
// тяжёлый запрос, выполняется периодически, не на каждый запрос юзера.
import { SERVERS } from './data.js';
import type { Station } from './types.js';

const SEARCH_PATH =
	'/json/stations/search?hidebroken=true&order=votes&reverse=true&limit=100000';

// Перебираем зеркала по очереди: ответило ошибкой (502) или отвалилось —
// идём к следующему. Успех = первое зеркало, вернувшее данные.
export const fetchAllStations = async (): Promise<Station[]> => {
	for (const server of SERVERS) {
		try {
			const res = await fetch(`${server}${SEARCH_PATH}`, {
				signal: AbortSignal.timeout(60000),
			});

			if (res.ok) return await res.json();
		} catch {
			// таймаут/обрыв — пробуем следующее зеркало
		}
	}

	throw new Error('все зеркала radio-browser недоступны');
};
