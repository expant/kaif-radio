// Шов данных станций: единственное место, знающее про radio-browser.
// Вопросы приложения ↓ (жанр→станции, счётчик, uuid→станции). С появлением
// backend реализация этих функций уедет на него, приложение не меняется.
import type { Station } from './types';
import { resolveBaseUrl } from './resolveServer';
import { PAGE_SIZE } from '../../shared/constants/pagination';

export const fetchStationsByTag = async (tag: string, page: number): Promise<Station[]> => {
	const baseUrl = await resolveBaseUrl();
	const offset = (page - 1) * PAGE_SIZE;

	const response = await fetch(
		`${baseUrl}/stations/bytag/${encodeURIComponent(tag)}?limit=${PAGE_SIZE}&offset=${offset}&hidebroken=true&order=votes&reverse=true`,
		{ signal: AbortSignal.timeout(8000) },
	);

	if (!response.ok) throw new Error('Failed to fetch stations');

	return response.json();
};

export const fetchStationCount = async (tag: string): Promise<number> => {
	const baseUrl = await resolveBaseUrl();

	const response = await fetch(`${baseUrl}/tags/${encodeURIComponent(tag)}`, {
		signal: AbortSignal.timeout(8000),
	});

	if (!response.ok) throw new Error('Failed to fetch station count');

	const data = (await response.json()) as Array<{ name: string; stationcount: number }>;

	const exact = data.find((t) => t.name.toLowerCase() === tag.toLowerCase());

	return exact?.stationcount ?? 0;
};

const fetchStationByUuid = async (baseUrl: string, uuid: string): Promise<Station | null> => {
	try {
		const response = await fetch(`${baseUrl}/stations/byuuid/${uuid}`, {
			signal: AbortSignal.timeout(5000),
		});

		if (!response.ok) return null;

		const data: Station[] = await response.json();

		return data[0] ?? null;
	} catch {
		return null;
	}
};

// Разворачивает сохранённые uuid избранного в полные станции (те, что ещё живы).
export const fetchStationsByUuids = async (uuids: string[]): Promise<Station[]> => {
	if (uuids.length === 0) return [];

	const baseUrl = await resolveBaseUrl();
	const results = await Promise.all(uuids.map((uuid) => fetchStationByUuid(baseUrl, uuid)));

	return results.filter((s): s is Station => s !== null);
};
