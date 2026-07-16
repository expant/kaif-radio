import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/features/auth/model/hooks/useAuth';
import { getFavorites, addFavorite, removeFavorite } from '@/entities/favorite/api/favoritesApi';
import { resolveBaseUrl } from '@/entities/station/resolveServer';
import type { Station } from '@/entities/station/types';
import type { Favorite } from '@/entities/favorite/model/types';
import { FavoritesContext } from './context';
import type { FavoriteStation, FavoritesProviderProps } from './types';

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

const toUnavailable = (f: Favorite): FavoriteStation => ({
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
});

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
	const { session } = useAuth();
	const [ids, setIds] = useState<Set<string>>(new Set());
	const [stations, setStations] = useState<FavoriteStation[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Полный список станций (тяжёлый резолв через radio-browser) грузим лениво —
	// только когда пользователь открыл вкладку «избранное».
	const loadedRef = useRef(false);

	// Лёгкая загрузка id при смене сессии — источник для всех сердечек.
	useEffect(() => {
		let cancelled = false;

		const load = async () => {
			if (!session) {
				if (!cancelled) {
					setIds(new Set());
					setStations([]);
				}
				return;
			}

			try {
				const favorites = await getFavorites(session.user.id);
				if (!cancelled) setIds(new Set(favorites.map((f) => f.station_uuid)));
			} catch {
				// не критично — просто не покажем лайки
			}
		};

		loadedRef.current = false;
		load();

		return () => {
			cancelled = true;
		};
	}, [session]);

	const ensureLoaded = useCallback(async () => {
		if (loadedRef.current || !session) return;
		loadedRef.current = true;

		setLoading(true);
		setError(null);

		try {
			const favorites = await getFavorites(session.user.id);

			if (favorites.length === 0) {
				setStations([]);
				return;
			}

			const uuids = favorites.map((f) => f.station_uuid);
			const found = await fetchStationsByUuids(uuids);
			const foundUuids = new Set(found.map((s) => s.stationuuid));
			const unavailable = favorites.filter((f) => !foundUuids.has(f.station_uuid)).map(toUnavailable);

			setStations([...found, ...unavailable]);
		} catch {
			setError('не удалось загрузить избранные станции');
			loadedRef.current = false; // разрешаем повтор
		} finally {
			setLoading(false);
		}
	}, [session]);

	const toggle = useCallback(
		async (station: Station) => {
			if (!session) return;

			const isFavorited = ids.has(station.stationuuid);

			// оптимистично обновляем и id (сердечки), и список
			setIds((prev) => {
				const next = new Set(prev);
				if (isFavorited) next.delete(station.stationuuid);
				else next.add(station.stationuuid);
				return next;
			});
			setStations((prev) => {
				if (isFavorited) return prev.filter((s) => s.stationuuid !== station.stationuuid);
				if (prev.some((s) => s.stationuuid === station.stationuuid)) return prev;
				return [station, ...prev];
			});

			try {
				if (isFavorited) {
					await removeFavorite(session.user.id, station.stationuuid);
				} else {
					await addFavorite(session.user.id, station);
				}
			} catch {
				// откат
				setIds((prev) => {
					const next = new Set(prev);
					if (isFavorited) next.add(station.stationuuid);
					else next.delete(station.stationuuid);
					return next;
				});
				setStations((prev) => {
					if (isFavorited) return [station, ...prev];
					return prev.filter((s) => s.stationuuid !== station.stationuuid);
				});
			}
		},
		[session, ids],
	);

	return (
		<FavoritesContext.Provider value={{ ids, stations, loading, error, toggle, ensureLoaded }}>
			{children}
		</FavoritesContext.Provider>
	);
};
