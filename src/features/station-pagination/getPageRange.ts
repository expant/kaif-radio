export const getPageRange = (
	page: number,
	totalPages: number,
): Array<number | '...'> => {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	const pages: Array<number | '...'> = [1, 2];

	if (page > 4) pages.push('...');

	for (
		let i = Math.max(3, page - 1);
		i <= Math.min(totalPages - 2, page + 1);
		i++
	) {
		pages.push(i);
	}

	if (page < totalPages - 3) pages.push('...');

	pages.push(totalPages - 1, totalPages);

	return pages;
};
