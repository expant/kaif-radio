import type { ReactNode } from 'react';
import type { Station } from '../../../entities/station/types';

export type StationListProps = {
	stations: Station[];
	loading: boolean;
	error: string | null;
	currentStationId: string | null;
	isPlaying: boolean;
	onSelect: (station: Station) => void;
	renderFavoriteButton?: (station: Station) => ReactNode;
};
