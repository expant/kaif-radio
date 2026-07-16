import { useState } from 'react';
import { usePlayer } from '../../../../widgets/player/model/hooks/usePlayer';
import { useStations } from '../../../../shared/hooks/useStations';
import { usePagination } from '../../../../features/station-pagination/model/hooks/usePagination';
import { useGenres } from '../../../../features/genre-filter/model/hooks/useGenres';
import { useFavoriteIds } from '../../../../features/favorites/model/hooks/useFavoriteIds';
import { useFavoritesFilter } from '../../../../features/favorites/model/hooks/useFavoritesFilter';
import { FAVORITES_TAG } from '../../../../features/genre-filter/model/constants';

export const useRadioPage = () => {
	const [genre, setGenre] = useState('lofi');

	const isFavoritesMode = genre === FAVORITES_TAG;

	const { genres, validating, validationError, addGenre, removeGenre, clearError } = useGenres();
	const { page, totalPages, totalCount, setPage } = usePagination(isFavoritesMode ? '' : genre);
	const {
		stations: radioStations,
		loading: radioLoading,
		error: radioError,
	} = useStations(isFavoritesMode ? '' : genre, page);
	const {
		stations: favoriteStations,
		loading: favLoading,
		error: favError,
	} = useFavoritesFilter(isFavoritesMode);
	const { ids: favoriteIds, toggle: toggleFavorite } = useFavoriteIds();
	const player = usePlayer();

	const stations = isFavoritesMode ? favoriteStations : radioStations;
	const loading = isFavoritesMode ? favLoading : radioLoading;
	const error = isFavoritesMode ? favError : radioError;

	const accentColor = player.accentColor;

	return {
		genre,
		setGenre,
		isFavoritesMode,
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
		favoriteIds,
		toggleFavorite,
	};
};
