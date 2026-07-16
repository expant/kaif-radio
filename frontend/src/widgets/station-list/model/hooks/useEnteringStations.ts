import { useState, useRef, useLayoutEffect } from 'react';

// Возвращает id строк, которые только что добавились в текущий список —
// для enter-анимации. Первая загрузка и полная замена (жанр/страница)
// не анимируются: считаем «новыми» только те, что появились рядом с уже
// существующими (есть пересечение с прежним набором).
export const useEnteringStations = <T extends { stationuuid: string }>(source: T[]) => {
	const prevIdsRef = useRef<Set<string> | null>(null);
	const [entering, setEntering] = useState<Set<string>>(new Set());

	useLayoutEffect(() => {
		const prev = prevIdsRef.current;
		const currentIds = source.map((s) => s.stationuuid);

		let next = new Set<string>();
		if (prev && prev.size > 0 && currentIds.some((id) => prev.has(id))) {
			next = new Set(currentIds.filter((id) => !prev.has(id)));
		}

		setEntering(next);
		prevIdsRef.current = new Set(currentIds);
	}, [source]);

	return entering;
};
