import type { CSSProperties } from 'react';
import type { PlayerProps } from '../../model/types';
import { Wave } from '../../../../shared/ui/Wave/Wave';
import { StationAvatar } from '../../../../shared/ui/StationAvatar/StationAvatar';
import { FavoriteButton } from '../../../../features/favorites/ui/FavoriteButton';
import { PlayPauseButton } from '../../../../features/playback/ui/PlayPauseButton/PlayPauseButton';
import { VolumeControl } from '../../../../features/playback/ui/VolumeControl/VolumeControl';
import styles from './Player.module.css';

export const Player = ({ player, accentColor }: PlayerProps) => {
	const { currentStation, isPlaying, playError, genre } = player;

	return (
		<aside
			className={`${styles.panel} ${isPlaying ? styles.isPlaying : ''}`}
			style={{ '--accent': accentColor } as CSSProperties}
		>
			<div className={styles.head}>
				<span className={styles.badge}>
					<span className={styles.dot} /> live
				</span>
				<div className={styles.eq}>
					<span />
					<span />
					<span />
					<span />
					<span />
				</div>
			</div>

			<div className={styles.art}>
				{currentStation ? (
					<StationAvatar
						name={currentStation.name}
						favicon={currentStation.favicon}
						color={accentColor}
						variant="art"
					/>
				) : (
					<span>&#9834;</span>
				)}
			</div>

			<div className={styles.info}>
				{currentStation && genre && <span className={styles.genre}># {genre}</span>}
				<div className={styles.name} title={currentStation?.name}>
					{currentStation ? currentStation.name : 'kaifradio'}
				</div>
				<div className={styles.sub}>
					{playError
						? playError
						: currentStation
							? isPlaying
								? `${currentStation.country} · live`
								: 'на паузе'
							: 'выбери станцию из списка'}
				</div>
			</div>

			<div className={styles.controls}>
				<PlayPauseButton size={30} />

				<VolumeControl size={22} />

				{currentStation && (
					<span className={styles.fav}>
						<FavoriteButton station={currentStation} />
					</span>
				)}
			</div>

			<Wave active={isPlaying} />
		</aside>
	);
};
