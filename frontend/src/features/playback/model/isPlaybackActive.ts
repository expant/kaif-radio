import type { PlayerStatus } from './types';

export const isPlaybackActive = (status: PlayerStatus): boolean =>
	status === 'playing' || status === 'connecting';
