import type { StatusTextParams } from './types';

const STATUS_WORD: Record<'connecting' | 'playing' | 'paused', string> = {
	connecting: 'подключаемся…',
	playing: 'live',
	paused: 'на паузе',
};

export const getStatusText = ({ status, playError, detail }: StatusTextParams): string => {
	switch (status) {
		case 'error':
			return playError ?? 'станция не отвечает';
		case 'idle':
			return 'выбери станцию из списка';
		default: {
			const word = STATUS_WORD[status];
			return detail ? `${detail} · ${word}` : word;
		}
	}
};
