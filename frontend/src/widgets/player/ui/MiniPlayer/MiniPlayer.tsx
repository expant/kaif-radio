import type { CSSProperties } from 'react';
import { usePlayer } from '@/features/playback/model/hooks/usePlayer';
import { PlayPauseButton } from '@/features/playback/ui/PlayPauseButton/PlayPauseButton';
import { VolumeControl } from '@/features/playback/ui/VolumeControl/VolumeControl';
import { StationAvatar } from '@/shared/ui/StationAvatar/StationAvatar';
import { FavoriteButton } from '@/features/favorites/ui/FavoriteButton';
import styles from './MiniPlayer.module.css';

export const MiniPlayer = () => {
	const { currentStation, isPlaying, playError, accentColor, genre } = usePlayer();

	if (!currentStation) return null;

	const accent = accentColor;
	const status = isPlaying ? 'live' : 'на паузе';
	const sub = playError ?? (genre ? `${genre} · ${status}` : status);

	return (
		<div className={styles.dock} style={{ '--accent': accent } as CSSProperties}>
			<div className={styles.avatar}>
				<StationAvatar name={currentStation.name} favicon={currentStation.favicon} color={accent} />
			</div>

			<div className={styles.info}>
				<div className={styles.name} title={currentStation.name}>
					{currentStation.name}
				</div>
				<div className={styles.sub}>{sub}</div>
			</div>

			<FavoriteButton station={currentStation} />

			<PlayPauseButton size={22} />

			<VolumeControl size={18} />
		</div>
	);
};
