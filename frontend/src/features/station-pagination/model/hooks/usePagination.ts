import { useState } from 'react';

// Только состояние страницы. Счётчик станций теперь приходит вместе со списком
// (useStations), поэтому пагинация больше не ходит в сеть.
export const usePagination = (tag: string) => {
	const [page, setPage] = useState(1);
	const [prevTag, setPrevTag] = useState(tag);

	// сброс на первую страницу при смене жанра — паттерн React (правка во время рендера)
	if (tag !== prevTag) {
		setPrevTag(tag);
		setPage(1);
	}

	return { page, setPage };
};
