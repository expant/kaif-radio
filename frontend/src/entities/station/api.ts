// Шов данных станций: единственное место, знающее адрес нашего бэкенда.
// Всё общение с внешним источником станций теперь на стороне backend.
import type { Station, StationsResponse } from './types';

const API_URL = import.meta.env.VITE_API_URL as string;

export const fetchStations = async (tag: string, page: number): Promise<StationsResponse> => {
	const res = await fetch(`${API_URL}/stations?genre=${encodeURIComponent(tag)}&page=${page}`, {
		signal: AbortSignal.timeout(8000),
	});

	if (!res.ok) throw new Error('Failed to fetch stations');

	return res.json();
};

export const fetchStationsByUuids = async (uuids: string[]): Promise<Station[]> => {
	if (uuids.length === 0) return [];

	const ids = uuids.map(encodeURIComponent).join(',');

	const res = await fetch(`${API_URL}/stations/by-uuids?ids=${ids}`, {
		signal: AbortSignal.timeout(8000),
	});

	if (!res.ok) throw new Error('Failed to fetch favorite stations');

	return res.json();
};
