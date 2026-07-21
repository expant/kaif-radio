// Query-параметры эндпоинтов станций.
export type StationsQuery = {
	genre?: string;
	page?: string;
};

// ids — uuid избранных станций через запятую.
export type ByUuidsQuery = {
	ids?: string;
};
