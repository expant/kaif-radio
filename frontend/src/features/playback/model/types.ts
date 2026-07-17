import type { ReactNode } from 'react';
import type { Station } from '../../../entities/station/types';

export type PlayerState = {
	currentStation: Station | null;
	isPlaying: boolean;
	volume: number;
	playError: string | null;
	accentColor: string;
	genre: string | null;
	setVolume: (v: number) => void;
	play: (station: Station, accentColor?: string, genre?: string) => Promise<void>;
	stop: () => void;
};

export type PlayerProviderProps = {
	children: ReactNode;
};

export type PlayPauseButtonProps = {
	// Размер иконки: панель — крупная, мини-док — компактная.
	size?: number;
};

export type VolumeControlProps = {
	// Размер иконки динамика.
	size?: number;
};
