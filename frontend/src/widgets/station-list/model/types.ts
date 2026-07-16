import type { ReactNode } from 'react';
import type { Station } from '../../../entities/station/types';

export type StationListProps = {
	stations: Station[];
	loading: boolean;
	error: string | null;
	currentStationId: string | null;
	isPlaying: boolean;
	onSelect: (station: Station, accentColor: string) => void;
	renderFavoriteButton?: (station: Station) => ReactNode;
};

export type StationItemProps = {
	station: Station;
	isActive: boolean;
	isPlaying: boolean;
	isEntering: boolean;
	onSelect: (station: Station, accentColor: string) => void;
	renderFavoriteButton?: (station: Station) => ReactNode;
};
