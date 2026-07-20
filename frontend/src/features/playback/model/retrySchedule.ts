import type { RetrySchedule } from './types';

export const createRetrySchedule = (delaysMs: number[]): RetrySchedule => {
	let attempt = 0;

	return {
		reset: () => {
			attempt = 0;
		},
		nextDelayMs: () => (attempt < delaysMs.length ? delaysMs[attempt++] : null),
	};
};
