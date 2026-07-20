import { useRef } from 'react';
import type { TimerControl } from '../types';

export const useTimer = (): TimerControl => {
	const idRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const clear = () => {
		if (idRef.current === null) return;

		clearTimeout(idRef.current);

		idRef.current = null;
	};

	const start = (fn: () => void, ms: number) => {
		clear();

		idRef.current = setTimeout(() => {
			idRef.current = null;
			fn();
		}, ms);
	};

	const isActive = () => idRef.current !== null;

	return { start, clear, isActive };
};
