import { createContext } from 'react';
import type { FavoritesContextType } from './types';

export const FavoritesContext = createContext<FavoritesContextType>({
	ids: new Set(),
	stations: [],
	loading: false,
	error: null,
	toggle: async () => {},
	ensureLoaded: () => {},
});
