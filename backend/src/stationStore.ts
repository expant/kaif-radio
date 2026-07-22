import { fetchAllStations } from './radioBrowser/client.js';
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

// Обновить память из radio-browser.
export const refreshStations = async (): Promise<void> => {
	const raw = await fetchAllStations();
	const trimmed = raw.map(trim);

	all = trimmed;
	byUuid = new Map(trimmed.map((s) => [s.stationuuid, s]));
	lastRefreshedAt = new Date().toISOString();
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

// Выгрузка при старте + обновление раз в час. Ошибки не роняют процесс.
export const startStationRefresh = (): void => {
	refreshStations().catch((err) =>
		console.error('Первая выгрузка станций не удалась:', err),
	);

	setInterval(() => {
		refreshStations().catch((err) =>
			console.error('Обновление станций не удалось:', err),
		);
	}, REFRESH_INTERVAL_MS);
};
