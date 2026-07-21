import { useState, useEffect } from 'react';
import { fetchStations } from '../../entities/station/api';
import type { Station } from '../../entities/station/types';

export const useStations = (tag: string, page: number) => {
	const [stations, setStations] = useState<Station[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			setError(null);

			try {
				const data = await fetchStations(tag, page);

				setStations(data.stations);
				setTotalCount(data.totalCount);
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		};

		load();
	}, [tag, page]);

	return { stations, totalCount, loading, error };
};
