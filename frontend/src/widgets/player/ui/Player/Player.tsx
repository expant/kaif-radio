import type { CSSProperties } from 'react';
import type { PlayerProps } from '../../model/types';
import { IconPlay } from '../../../../shared/ui/icons/IconPlay';
import { IconPause } from '../../../../shared/ui/icons/IconPause';
import { IconVolume } from '../../../../shared/ui/icons/IconVolume';
import { Wave } from '../../../../shared/ui/Wave/Wave';
import { StationAvatar } from '../../../../shared/ui/StationAvatar/StationAvatar';
import { FavoriteButton } from '../../../../features/favorites/ui/FavoriteButton';
import styles from './Player.module.css';

export const Player = ({ player, accentColor }: PlayerProps) => {
	const { currentStation, isPlaying, volume, playError, genre, setVolume, play, stop } = player;

	const handlePlayPause = () => {
		if (!currentStation) return;
		if (isPlaying) stop();
		else play(currentStation);
	};

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
				<button
					className={styles.mainBtn}
					onClick={handlePlayPause}
					disabled={!currentStation}
					aria-label={isPlaying ? 'Пауза' : 'Играть'}
				>
					{isPlaying ? <IconPause size={30} /> : <IconPlay size={30} />}
				</button>
				<div className={styles.vol}>
					<IconVolume size={22} />
					<input
						type="range"
						min={0}
						max={1}
						step={0.01}
						value={volume}
						onChange={(e) => setVolume(Number(e.target.value))}
					/>
				</div>

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
