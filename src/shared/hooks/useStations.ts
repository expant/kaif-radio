import { useState, useEffect } from 'react';
import { fetchStationsByTag } from '../../entities/station/api';
import type { Station } from '../../entities/station/types';

export const useStations = (tag: string) => {
	const [stations, setStations] = useState<Station[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		setError(null);

		fetchStationsByTag(tag)
			.then(setStations)
			.catch((e: Error) => setError(e.message))
			.finally(() => setLoading(false));
	}, [tag]);

	return { stations, loading, error };
};
