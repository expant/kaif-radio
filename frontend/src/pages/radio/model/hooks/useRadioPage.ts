import { useState, useEffect } from 'react';
import { usePlayer } from '../../../../features/playback/model/hooks/usePlayer';
import { useStations } from '../../../../shared/hooks/useStations';
import { usePagination } from '../../../../features/station-pagination/model/hooks/usePagination';
import { useGenres } from '../../../../features/genre-filter/model/hooks/useGenres';
import { useFavorites } from '../../../../features/favorites/model/hooks/useFavorites';
import { FAVORITES_TAG } from '../../../../features/genre-filter/model/constants';
import { PAGE_SIZE } from '../../../../shared/constants/pagination';

export const useRadioPage = () => {
	const [genre, setGenre] = useState('lofi');

	const isFavoritesMode = genre === FAVORITES_TAG;

	const { genres, validating, validationError, addGenre, removeGenre, clearError } = useGenres();
	const { page, setPage } = usePagination(isFavoritesMode ? '' : genre);
	const {
		stations: radioStations,
		totalCount,
		loading: radioLoading,
		error: radioError,
	} = useStations(isFavoritesMode ? '' : genre, page);

	const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
	const {
		stations: favoriteStations,
		loading: favLoading,
		error: favError,
		ensureLoaded: ensureFavoritesLoaded,
	} = useFavorites();
	const player = usePlayer();

	useEffect(() => {
		if (isFavoritesMode) ensureFavoritesLoaded();
	}, [isFavoritesMode, ensureFavoritesLoaded]);

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
	};
};
