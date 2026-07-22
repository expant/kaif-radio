import { fetchAllStations } from './radioBrowser/client.js';
import { loadCatalog, saveCatalog } from './stationCache.js';
import type { Station } from './radioBrowser/types.js';

const PAGE_SIZE = 30;
const REFRESH_INTERVAL_MS = 60 * 60 * 1000; // 1 час

let all: Station[] = [];
let byUuid = new Map<string, Station>();
let lastRefreshedAt: string | null = null;

const trim = (s: Station): Station => ({
	stationuuid: s.stationuuid,
	name: s.name,
	url: s.url,
	url_resolved: s.url_resolved,
	favicon: s.favicon ?? '',
	tags: s.tags ?? '',
	country: s.country ?? '',
	votes: s.votes ?? 0,
	bitrate: s.bitrate ?? 0,
});

const hasTag = (station: Station, genre: string): boolean =>
	station.tags.split(',').some((t) => t.trim().toLowerCase() === genre);

// Наполнить память готовым списком станций (из сети или из кеша).
const setCatalog = (stations: Station[]): void => {
	all = stations;
	byUuid = new Map(stations.map((s) => [s.stationuuid, s]));
};

// Обновить память из radio-browser и сохранить свежий каталог в Redis.
export const refreshStations = async (): Promise<void> => {
	const raw = await fetchAllStations();

	setCatalog(raw.map(trim));
	lastRefreshedAt = new Date().toISOString();

	await saveCatalog(all);
};

// Мгновенный прогрев из Redis: поднимаем прошлый каталог, пока идёт первый
// сетевой refresh. lastRefreshedAt не трогаем — данные ещё не свежие.
const warmFromCache = async (): Promise<void> => {
	const cached = await loadCatalog();

	if (!cached) return;

	setCatalog(cached);
};

// Метаданные каталога для /health: прогрет ли и когда обновлялся.
export const getStationsMeta = () => ({
	count: all.length,
	refreshedAt: lastRefreshedAt,
});

export const getStationsByGenre = (genre: string, page: number) => {
	const matched = all.filter((s) => hasTag(s, genre.toLowerCase()));
	const start = (page - 1) * PAGE_SIZE;

	return {
		stations: matched.slice(start, start + PAGE_SIZE),
		totalCount: matched.length,
	};
};

export const getStationsByUuids = (ids: string[]): Station[] =>
	ids.map((id) => byUuid.get(id)).filter((s): s is Station => s !== undefined);

// Старт: прогрев из кеша → фоновая выгрузка из сети → обновление раз в час.
// Ошибки сети не роняют процесс.
export const startStationRefresh = async (): Promise<void> => {
	await warmFromCache();

	refreshStations().catch((err) =>
		console.error('Первая выгрузка станций не удалась:', err),
	);

	setInterval(() => {
		refreshStations().catch((err) =>
			console.error('Обновление станций не удалось:', err),
		);
	}, REFRESH_INTERVAL_MS);
};
