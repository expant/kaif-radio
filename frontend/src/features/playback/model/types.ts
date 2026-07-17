import type { ReactNode } from 'react';
import type { Station } from '../../../entities/station/types';

export type PlayerStatus = 'idle' | 'connecting' | 'playing' | 'paused' | 'error';

export type PlayerState = {
	currentStation: Station | null;
	status: PlayerStatus;
	volume: number;
	playError: string | null;
	accentColor: string;
	genre: string | null;
	setVolume: (v: number) => void;
	togglePlay: (station: Station, accentColor?: string, genre?: string) => Promise<void>;
};

export type PlayerProviderProps = {
	children: ReactNode;
};

export type PlayPauseButtonProps = {
	size?: number;
};

export type VolumeControlProps = {
	size?: number;
};

export type StatusTextParams = {
	status: PlayerStatus;
	playError: string | null;
	detail?: string | null;
};
