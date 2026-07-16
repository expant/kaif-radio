import type { CSSProperties } from 'react';
import { usePlayer } from '../../model/hooks/usePlayer';
import { IconPlay } from '@/shared/ui/icons/IconPlay';
import { IconPause } from '@/shared/ui/icons/IconPause';
import { IconVolume } from '@/shared/ui/icons/IconVolume';
import { StationAvatar } from '@/shared/ui/StationAvatar/StationAvatar';
import { FavoriteButton } from '@/features/favorites/ui/FavoriteButton';
import styles from './MiniPlayer.module.css';

export const MiniPlayer = () => {
	const { currentStation, isPlaying, volume, playError, accentColor, genre, setVolume, play } =
		usePlayer();

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

			<button
				className={styles.btn}
				onClick={() => play(currentStation)}
				aria-label={isPlaying ? 'Пауза' : 'Играть'}
			>
				{isPlaying ? <IconPause size={22} /> : <IconPlay size={22} />}
			</button>

			<div className={styles.vol}>
				<IconVolume size={18} />
				<input
					type="range"
					min={0}
					max={1}
					step={0.01}
					value={volume}
					onChange={(e) => setVolume(Number(e.target.value))}
					aria-label="Громкость"
				/>
			</div>
		</div>
	);
};
