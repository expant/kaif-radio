import { useRef, useState, useEffect } from 'react';
import type { Station } from '../../../entities/station/types';
import { PlayerContext } from './context';
import type { PlayerProviderProps } from './types';

const INITIAL_VOLUME = 0.8;
const DEFAULT_ACCENT = '#FF5A3C';

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [currentStation, setCurrentStation] = useState<Station | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolumeState] = useState(INITIAL_VOLUME);
	const [playError, setPlayError] = useState<string | null>(null);
	const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT);

	useEffect(() => {
		const audio = new Audio();
		audio.volume = INITIAL_VOLUME;
		audioRef.current = audio;

		return () => {
			audio.pause();
			audio.src = '';
			audioRef.current = null;
		};
	}, []);

	const setVolume = (v: number) => {
		setVolumeState(v);
		if (audioRef.current) audioRef.current.volume = v;
	};

	const startPlayback = async (audio: HTMLAudioElement, errorMessage: string) => {
		try {
			await audio.play();
			setIsPlaying(true);
			setPlayError(null);
		} catch {
			setIsPlaying(false);
			setPlayError(errorMessage);
		}
	};

	const play = async (station: Station, accent?: string) => {
		const audio = audioRef.current;
		if (!audio) return;

		if (currentStation?.stationuuid === station.stationuuid) {
			if (isPlaying) {
				audio.pause();
				setIsPlaying(false);
			} else {
				await startPlayback(audio, 'не удалось возобновить воспроизведение');
			}
			return;
		}

		audio.src = station.url_resolved || station.url;
		setCurrentStation(station);
		setAccentColor(accent ?? DEFAULT_ACCENT);

		await startPlayback(audio, 'не удалось воспроизвести эту станцию');
	};

	const stop = () => {
		audioRef.current?.pause();
		setIsPlaying(false);
	};

	return (
		<PlayerContext.Provider
			value={{ currentStation, isPlaying, volume, playError, accentColor, setVolume, play, stop }}
		>
			{children}
		</PlayerContext.Provider>
	);
};
