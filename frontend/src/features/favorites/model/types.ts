import type { ReactNode } from 'react';
import type { Station } from '../../../entities/station/types';

export type FavoriteButtonProps = {
	station: Station;
};

export type StationListFavoriteSlot = (station: Station) => ReactNode;

// Станция из избранного; unavailable — сохранена, но сейчас не отдаётся radio-browser.
export type FavoriteStation = Station & { unavailable?: boolean };

export type FavoritesContextType = {
	ids: Set<string>;
	stations: FavoriteStation[];
	loading: boolean;
	error: string | null;
	toggle: (station: Station) => Promise<void>;
	ensureLoaded: () => void;
};

export type FavoritesProviderProps = {
	children: ReactNode;
};
