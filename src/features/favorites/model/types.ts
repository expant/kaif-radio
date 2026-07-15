import type { ReactNode } from 'react';
import type { Station } from '../../../entities/station/types';

export type FavoriteButtonProps = {
	station: Station;
};

export type StationListFavoriteSlot = (station: Station) => ReactNode;
