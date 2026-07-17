import { createContext } from 'react';
import type { PlayerState } from './types';

export const PlayerContext = createContext<PlayerState>({
	currentStation: null,
	isPlaying: false,
	volume: 0.8,
	playError: null,
	accentColor: '#FF5A3C',
	genre: null,
	setVolume: () => {},
	play: async () => {},
	stop: () => {},
});
