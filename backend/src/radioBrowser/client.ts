// Шов данных станций на бэкенде: единственное место, знающее про radio-browser.
// Позже сюда добавится кеш (Redis) и фильтрация; наружу отдаём готовые станции.

const SERVERS = [
	'https://de1.api.radio-browser.info',
	'https://nl1.api.radio-browser.info',
	'https://at1.api.radio-browser.info',
];

const PAGE_SIZE = 30;

let cachedBaseUrl: string | null = null;

// Выбираем рабочее зеркало и запоминаем его на время жизни процесса.
const resolveBaseUrl = async (): Promise<string> => {
	if (cachedBaseUrl) return cachedBaseUrl;

	for (const server of SERVERS) {
		try {
			const res = await fetch(`${server}/json/stats`, { signal: AbortSignal.timeout(3000) });

			if (res.ok) {
				cachedBaseUrl = `${server}/json`;

				return cachedBaseUrl;
			}
		} catch {
			continue;
		}
	}

	// Все недоступны — вернём первый, ошибку обработает вызывающий.
	return `${SERVERS[0]}/json`;
};

export const fetchStationsByGenre = async (genre: string, page: number): Promise<unknown> => {
	const baseUrl = await resolveBaseUrl();
	const offset = (page - 1) * PAGE_SIZE;

	const res = await fetch(
		`${baseUrl}/stations/bytag/${encodeURIComponent(genre)}?limit=${PAGE_SIZE}&offset=${offset}&hidebroken=true&order=votes&reverse=true`,
		{ signal: AbortSignal.timeout(8000) },
	);

	if (!res.ok) throw new Error(`radio-browser responded ${res.status}`);

	return res.json();
};

// Общее число станций жанра — для пагинации и счётчика «станций в эфире».
export const fetchStationCount = async (genre: string): Promise<number> => {
	const baseUrl = await resolveBaseUrl();

	const res = await fetch(`${baseUrl}/tags/${encodeURIComponent(genre)}`, {
		signal: AbortSignal.timeout(8000),
	});

	if (!res.ok) throw new Error(`radio-browser responded ${res.status}`);

	const tags = (await res.json()) as Array<{ name: string; stationcount: number }>;
	const exact = tags.find((t) => t.name.toLowerCase() === genre.toLowerCase());

	return exact?.stationcount ?? 0;
};

// Одна станция по её uuid; null, если не нашлась или отвалилась.
const fetchStationByUuid = async (baseUrl: string, uuid: string): Promise<unknown> => {
	try {
		const res = await fetch(`${baseUrl}/stations/byuuid/${uuid}`, {
			signal: AbortSignal.timeout(5000),
		});

		if (!res.ok) return null;

		const data = (await res.json()) as unknown[];

		return data[0] ?? null;
	} catch {
		return null;
	}
};

// Разворачивает список uuid (из избранного) в полные станции — те, что ещё живы.
export const fetchStationsByUuids = async (uuids: string[]): Promise<unknown[]> => {
	if (uuids.length === 0) return [];

	const baseUrl = await resolveBaseUrl();
	const results = await Promise.all(uuids.map((uuid) => fetchStationByUuid(baseUrl, uuid)));

	return results.filter((s) => s !== null);
};
