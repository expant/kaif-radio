import { useState } from 'react';
import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage';
import { fetchStationCount } from '../../../../entities/station/api';
import { DEFAULT_GENRES, GENRES_STORAGE_KEY } from '../constants';

export const useGenres = () => {
	const [genres, setGenres] = useLocalStorage<string[]>(GENRES_STORAGE_KEY, DEFAULT_GENRES);
	const [validating, setValidating] = useState(false);
	const [validationError, setValidationError] = useState<string | null>(null);

	const addGenre = async (input: string) => {
		const genre = input.trim().toLowerCase();

		if (!genre) return;

		if (genres.includes(genre)) {
			setValidationError('такой жанр уже есть в списке');
			return;
		}

		setValidating(true);
		setValidationError(null);

		try {
			const count = await fetchStationCount(genre);

			if (count === 0) {
				setValidationError('станций с таким жанром не нашлось — попробуй другой');
				return;
			}

			setGenres([...genres, genre]);
		} catch {
			setValidationError('не удалось проверить жанр, попробуй ещё раз');
		} finally {
			setValidating(false);
		}
	};

	const removeGenre = (genre: string) => {
		setGenres(genres.filter((g) => g !== genre));
	};

	const clearError = () => setValidationError(null);

	return { genres, validating, validationError, addGenre, removeGenre, clearError };
};
