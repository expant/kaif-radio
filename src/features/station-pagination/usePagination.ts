import { useState, useEffect } from 'react';
import { fetchStationCount } from '../../entities/station/api';
import { PAGE_SIZE } from '../../shared/constants/pagination';

export const usePagination = (tag: string) => {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		setPage(1);

		fetchStationCount(tag)
			.then((count) => {
				setTotalCount(count);
				setTotalPages(Math.max(1, Math.ceil(count / PAGE_SIZE)));
			})
			.catch(() => {
				setTotalCount(0);
				setTotalPages(1);
			});
	}, [tag]);

	return { page, totalPages, totalCount, setPage };
};
