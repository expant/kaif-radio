import { useState } from 'react';
import type { Station } from '../../../entities/station/types';
import { PlayerContext } from './context';
import { isPlaybackActive } from './isPlaybackActive';
import { useAudioEngine } from './hooks/useAudioEngine';
import { DEFAULT_ACCENT } from './constants';
import type { PlayerProviderProps } from './types';

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
	const engine = useAudioEngine();
	const [currentStation, setCurrentStation] = useState<Station | null>(null);
	const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT);
	const [genre, setGenre] = useState<string | null>(null);

	// Домен решает «что сделать со станцией», механику отдаёт движку.
	const togglePlay = (station: Station, accent?: string, originGenre?: string) => {
		if (currentStation?.stationuuid === station.stationuuid) {
			if (isPlaybackActive(engine.status)) engine.pause();
			else engine.resume();
			return;
		}

		setCurrentStation(station);
		setAccentColor(accent ?? DEFAULT_ACCENT);
		setGenre(originGenre ?? null);

		engine.play(station.url_resolved || station.url);
	};

	return (
		<PlayerContext.Provider
			value={{
				currentStation,
				status: engine.status,
				volume: engine.volume,
				playError: engine.playError,
				accentColor,
				genre,
				setVolume: engine.setVolume,
				togglePlay,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
};
