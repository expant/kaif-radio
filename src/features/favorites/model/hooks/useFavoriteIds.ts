import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/model/hooks/useAuth';
import { getFavorites, addFavorite, removeFavorite } from '@/entities/favorite/api/favoritesApi';
import type { Station } from '@/entities/station/types';

export const useFavoriteIds = () => {
	const { session } = useAuth();
	const [ids, setIds] = useState<Set<string>>(new Set());
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!session) {
			setIds(new Set());
			return;
		}

		const load = async () => {
			try {
				const favorites = await getFavorites(session.user.id);
				setIds(new Set(favorites.map((f) => f.station_uuid)));
			} catch {
				// не критично — просто не покажем лайки
			}
		};

		load();
	}, [session]);

	const toggle = async (station: Station) => {
		if (!session) return;

		const isFavorited = ids.has(station.stationuuid);

		setIds((prev) => {
			const next = new Set(prev);
			if (isFavorited) next.delete(station.stationuuid);
			else next.add(station.stationuuid);
			return next;
		});

		try {
			if (isFavorited) {
				await removeFavorite(session.user.id, station.stationuuid);
			} else {
				await addFavorite(session.user.id, station);
			}
		} catch {
			setIds((prev) => {
				const next = new Set(prev);
				if (isFavorited) next.add(station.stationuuid);
				else next.delete(station.stationuuid);
				return next;
			});
		}
	};

	return { ids, loading, toggle };
};
