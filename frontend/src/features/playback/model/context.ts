import { createContext } from 'react';
import { DEFAULT_ACCENT, INITIAL_VOLUME } from './constants';
import type { PlayerState } from './types';

export const PlayerContext = createContext<PlayerState>({
	currentStation: null,
	status: 'idle',
	volume: INITIAL_VOLUME,
	playError: null,
	accentColor: DEFAULT_ACCENT,
	genre: null,
	setVolume: () => {},
	togglePlay: () => {},
});
