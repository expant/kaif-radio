import type { CSSProperties } from 'react';
import type { PlayerProps } from '../../model/types';
import { Wave } from '../../../../shared/ui/Wave/Wave';
import { StationAvatar } from '../../../../shared/ui/StationAvatar/StationAvatar';
import { FavoriteButton } from '../../../../features/favorites/ui/FavoriteButton';
import { PlayPauseButton } from '../../../../features/playback/ui/PlayPauseButton/PlayPauseButton';
import { VolumeControl } from '../../../../features/playback/ui/VolumeControl/VolumeControl';
import { getStatusText } from '../../../../features/playback/model/statusText';
import styles from './Player.module.css';

export const Player = ({ player, accentColor }: PlayerProps) => {
	const { currentStation, status, playError, genre } = player;

	const isLive = status === 'playing';

	return (
		<aside
			className={`${styles.panel} ${isLive ? styles.isPlaying : ''}`}
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
					{getStatusText({ status, playError, detail: currentStation?.country })}
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

			<Wave active={isLive} />
		</aside>
	);
};
