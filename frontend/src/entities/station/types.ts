export type Station = {
	stationuuid: string;
	name: string;
	url: string;
	url_resolved: string;
	favicon: string;
	tags: string;
	country: string;
	votes: number;
	bitrate: number;
};

// Ответ бэкенда на GET /stations — список и общее число одним объектом.
export type StationsResponse = {
	stations: Station[];
	totalCount: number;
};
