import { useRef, useState, useEffect } from 'react';
import type { Station } from '../../../entities/station/types';
import { PlayerContext } from './context';
import { isPlaybackActive } from './isPlaybackActive';
import type { PlayerProviderProps, PlayerStatus } from './types';

const INITIAL_VOLUME = 0.8;
const DEFAULT_ACCENT = '#FF5A3C';

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [currentStation, setCurrentStation] = useState<Station | null>(null);
	const [status, setStatus] = useState<PlayerStatus>('idle');
	const [volume, setVolumeState] = useState(INITIAL_VOLUME);
	const [playError, setPlayError] = useState<string | null>(null);
	const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT);
	const [genre, setGenre] = useState<string | null>(null);

	useEffect(() => {
		const audio = new Audio();
		audio.volume = INITIAL_VOLUME;
		audioRef.current = audio;

		const onPlaying = () => setStatus('playing');
		const onWaiting = () => setStatus('connecting');
		const onError = () => {
			setStatus('error');
			setPlayError('станция не отвечает');
		};
		const onPause = () => setStatus((prev) => (prev === 'connecting' ? prev : 'paused'));

		audio.addEventListener('playing', onPlaying);
		audio.addEventListener('waiting', onWaiting);
		audio.addEventListener('error', onError);
		audio.addEventListener('pause', onPause);

		return () => {
			audio.removeEventListener('playing', onPlaying);
			audio.removeEventListener('waiting', onWaiting);
			audio.removeEventListener('error', onError);
			audio.removeEventListener('pause', onPause);
			audio.pause();
			audio.src = '';
			audioRef.current = null;
		};
	}, []);

	const setVolume = (v: number) => {
		setVolumeState(v);
		if (audioRef.current) audioRef.current.volume = v;
	};

	const startAudio = async (audio: HTMLAudioElement, errorMessage: string) => {
		setStatus('connecting');
		setPlayError(null);

		try {
			await audio.play();
			setStatus('playing');
		} catch {
			setStatus('error');
			setPlayError(errorMessage);
		}
	};

	const togglePlay = async (station: Station, accent?: string, originGenre?: string) => {
		const audio = audioRef.current;
		if (!audio) return;

		if (currentStation?.stationuuid === station.stationuuid) {
			if (isPlaybackActive(status)) {
				audio.pause();
				setStatus('paused');
			} else {
				await startAudio(audio, 'не удалось возобновить воспроизведение');
			}
			return;
		}

		setStatus('connecting');

		audio.src = station.url_resolved || station.url;

		setCurrentStation(station);
		setAccentColor(accent ?? DEFAULT_ACCENT);
		setGenre(originGenre ?? null);

		await startAudio(audio, 'не удалось воспроизвести эту станцию');
	};

	return (
		<PlayerContext.Provider
			value={{
				currentStation,
				status,
				volume,
				playError,
				accentColor,
				genre,
				setVolume,
				togglePlay,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
};
