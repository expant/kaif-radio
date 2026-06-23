import { useState, useEffect } from 'react';
import { fetchStationsByTag } from '../../entities/station/api';
import type { Station } from '../../entities/station/types';

export const useStations = (tag: string, page: number) => {
	const [stations, setStations] = useState<Station[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			setError(null);

			try {
				const data = await fetchStationsByTag(tag, page);
				setStations(data);
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		};

		load();
	}, [tag, page]);

	return { stations, loading, error };
};
