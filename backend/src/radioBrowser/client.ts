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
