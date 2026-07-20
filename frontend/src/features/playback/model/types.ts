import type { ReactNode } from 'react';
import type { Station } from '../../../entities/station/types';

export type PlayerStatus = 'idle' | 'connecting' | 'playing' | 'paused' | 'error';

// Перезапускаемый таймер: новый start отменяет предыдущий.
export type TimerControl = {
	start: (fn: () => void, ms: number) => void;
	clear: () => void;
	isActive: () => boolean;
};

// Счётчик действий: отложенный колбэк сверяет номер и выходит, если устарел.
export type ActionToken = {
	next: () => number;
	current: () => number;
	isCurrent: (token: number) => boolean;
};

// Расписание автоповторов: задержка до следующей попытки или null, если исчерпаны.
export type RetrySchedule = {
	reset: () => void;
	nextDelayMs: () => number | null;
};

// Реакции движка на события <audio>.
export type AudioElementHandlers = {
	onPlaying: () => void;
	onWaiting: () => void;
	onError: () => void;
	onPause: () => void;
};

// Механика надёжного аудио; про станции и контекст ничего не знает.
export type AudioEngine = {
	status: PlayerStatus;
	playError: string | null;
	volume: number;
	play: (src: string) => void;
	resume: () => void;
	pause: () => void;
	setVolume: (v: number) => void;
};

export type PlayerState = {
	currentStation: Station | null;
	status: PlayerStatus;
	volume: number;
	playError: string | null;
	accentColor: string;
	genre: string | null;
	setVolume: (v: number) => void;
	togglePlay: (station: Station, accentColor?: string, genre?: string) => void;
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
