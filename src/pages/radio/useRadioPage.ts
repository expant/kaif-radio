import { useState, useEffect } from 'react';
import { usePlayer } from '../../widgets/player/usePlayer';
import { useStations } from '../../shared/hooks/useStations';
import { getStationColorHex } from '../../shared/utils/stationColor';

export const useRadioPage = () => {
	const [genre, setGenre] = useState('lofi');
	const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
	const { stations, loading, error } = useStations(genre);
	const player = usePlayer();

	const currentIndex = player.currentStation
		? stations.findIndex(
				(s) => s.stationuuid === player.currentStation!.stationuuid,
			)
		: -1;
	const accentColor = getStationColorHex(
		currentIndex === -1 ? 0 : currentIndex,
	);

	useEffect(() => {
		console.log('Stations updated:', stations);
	}, [stations]);

	const handleLike = (stationId: string) => {
		setLikedIds((prev) => {
			const next = new Set(prev);
			if (next.has(stationId)) next.delete(stationId);
			else next.add(stationId);
			return next;
		});
	};

	return {
		genre,
		setGenre,
		stations,
		loading,
		error,
		player,
		likedIds,
		accentColor,
		handleLike,
	};
};
