import type { Station } from '../../../entities/station/types';

export type StationListProps = {
	stations: Station[];
	loading: boolean;
	error: string | null;
	currentStationId: string | null;
	isPlaying: boolean;
	likedIds: Set<string>;
	onSelect: (station: Station) => void;
	onLike: (stationId: string) => void;
};
