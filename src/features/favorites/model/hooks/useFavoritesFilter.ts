import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/model/hooks/useAuth';
import { getFavorites } from '@/entities/favorite/api/favoritesApi';
import { resolveBaseUrl } from '@/entities/station/resolveServer';
import type { Station } from '@/entities/station/types';
import type { Favorite } from '@/entities/favorite/model/types';

type FavoriteStation = Station & { unavailable?: boolean };

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

const fetchStationsByUuids = async (uuids: string[]): Promise<Station[]> => {
	if (uuids.length === 0) return [];
	const baseUrl = await resolveBaseUrl();
	const results = await Promise.all(uuids.map((uuid) => fetchStationByUuid(baseUrl, uuid)));
	return results.filter((s): s is Station => s !== null);
};

export const useFavoritesFilter = (active: boolean) => {
	const { session } = useAuth();
	const [stations, setStations] = useState<FavoriteStation[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!active || !session) return;

		const load = async () => {
			setLoading(true);
			setError(null);

			try {
				const favorites: Favorite[] = await getFavorites(session.user.id);

				if (favorites.length === 0) {
					setStations([]);
					return;
				}

				const uuids = favorites.map((f) => f.station_uuid);
				const found = await fetchStationsByUuids(uuids);
				const foundUuids = new Set(found.map((s) => s.stationuuid));

				const unavailable: FavoriteStation[] = favorites
					.filter((f) => !foundUuids.has(f.station_uuid))
					.map((f) => ({
						stationuuid: f.station_uuid,
						name: f.station_name,
						favicon: f.station_favicon ?? '',
						url: '',
						url_resolved: '',
						tags: '',
						country: '',
						votes: 0,
						bitrate: 0,
						unavailable: true,
					}));

				setStations([...found, ...unavailable]);
			} catch {
				setError('не удалось загрузить избранные станции');
			} finally {
				setLoading(false);
			}
		};

		load();
	}, [active, session]);

	return { stations, loading, error };
};
