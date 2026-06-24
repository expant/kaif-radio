import { useState } from 'react';
import { usePlayer } from '../../../../widgets/player/model/hooks/usePlayer';
import { useStations } from '../../../../shared/hooks/useStations';
import { usePagination } from '../../../../features/station-pagination/model/hooks/usePagination';
import { useGenres } from '../../../../features/genre-filter/model/hooks/useGenres';
import { getStationColorHex } from '../../../../shared/utils/stationColor';

export const useRadioPage = () => {
	const [genre, setGenre] = useState('lofi');

	const { genres, validating, validationError, addGenre, removeGenre, clearError } = useGenres();
	const { page, totalPages, totalCount, setPage } = usePagination(genre);
	const { stations, loading, error } = useStations(genre, page);
	const player = usePlayer();

	const currentIndex = player.currentStation
		? stations.findIndex((s) => s.stationuuid === player.currentStation!.stationuuid)
		: -1;

	const accentColor = getStationColorHex(currentIndex === -1 ? 0 : currentIndex);

	return {
		genre,
		setGenre,
		stations,
		loading,
		error,
		player,
		accentColor,
		page,
		totalPages,
		totalCount,
		setPage,
		genres,
		validating,
		validationError,
		addGenre,
		removeGenre,
		clearError,
	};
};
