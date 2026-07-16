import type { Station } from '../../../entities/station/types';

export type PlayerState = {
	currentStation: Station | null;
	isPlaying: boolean;
	volume: number;
	playError: string | null;
	accentColor: string;
	setVolume: (v: number) => void;
	play: (station: Station, accentColor?: string) => Promise<void>;
	stop: () => void;
};

export type PlayerProps = {
	player: PlayerState;
	accentColor: string;
};

export type PlayerProviderProps = {
	children: React.ReactNode;
};
