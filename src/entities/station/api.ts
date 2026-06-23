import type { Station } from './types';
import { resolveBaseUrl } from './resolveServer';

export const fetchStationsByTag = async (tag: string): Promise<Station[]> => {
	const baseUrl = await resolveBaseUrl();

	const response = await fetch(
		`${baseUrl}/stations/bytag/${encodeURIComponent(tag)}?limit=50&hidebroken=true&order=votes`,
		{ signal: AbortSignal.timeout(8000) },
	);

	if (!response.ok) throw new Error('Failed to fetch stations');

	return response.json();
};
