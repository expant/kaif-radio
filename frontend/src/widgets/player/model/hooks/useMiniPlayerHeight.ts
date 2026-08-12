import { useCallback, useRef } from 'react';

export const useMiniPlayerHeight = <T extends HTMLElement>() => {
	const observerRef = useRef<ResizeObserver | null>(null);

	return useCallback((el: T | null) => {
		const root = document.documentElement;

		if (observerRef.current) {
			observerRef.current.disconnect();
			observerRef.current = null;
		}

		if (!el) {
			root.style.removeProperty('--player-h');

			return;
		}

		const apply = () => {
			root.style.setProperty('--player-h', `${el.offsetHeight}px`);
		};

		apply();

		observerRef.current = new ResizeObserver(apply);
		observerRef.current.observe(el);
	}, []);
};
