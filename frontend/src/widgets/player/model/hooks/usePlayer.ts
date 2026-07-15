import { useRef, useState, useEffect } from 'react';
import type { Station } from '../../../../entities/station/types';
import type { PlayerState } from '../types';

export const usePlayer = (): PlayerState => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [currentStation, setCurrentStation] = useState<Station | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolumeState] = useState(0.8);
	const [playError, setPlayError] = useState<string | null>(null);

	useEffect(() => {
		audioRef.current = new Audio();
		audioRef.current.volume = volume;
	}, []);

	const setVolume = (v: number) => {
		setVolumeState(v);
		if (audioRef.current) audioRef.current.volume = v;
	};

	const play = async (station: Station) => {
		const audio = audioRef.current;
		if (!audio) return;

		if (currentStation?.stationuuid === station.stationuuid) {
			if (isPlaying) {
				audio.pause();
				setIsPlaying(false);
			} else {
				try {
					await audio.play();
					setIsPlaying(true);
					setPlayError(null);
				} catch {
					setIsPlaying(false);
					setPlayError('не удалось возобновить воспроизведение');
				}
			}
			return;
		}

		audio.src = station.url_resolved || station.url;
		setCurrentStation(station);

		try {
			await audio.play();
			setIsPlaying(true);
			setPlayError(null);
		} catch {
			setIsPlaying(false);
			setPlayError('не удалось воспроизвести эту станцию');
		}
	};

	const stop = () => {
		audioRef.current?.pause();
		setIsPlaying(false);
	};

	return { currentStation, isPlaying, volume, playError, setVolume, play, stop };
};
