import { useState, useEffect } from 'react';
import { fetchStationsByTag } from '../../entities/station/api';
import type { Station } from '../../entities/station/types';

export const useStations = (tag: string, page: number) => {
	const [stations, setStations] = useState<Station[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		setError(null);

		fetchStationsByTag(tag, page)
			.then(setStations)
			.catch((e: Error) => setError(e.message))
			.finally(() => setLoading(false));
	}, [tag, page]);

	return { stations, loading, error };
};
