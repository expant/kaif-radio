import type { PlayerProps } from './types';
import { getInitial } from '../../shared/utils/stationColor';
import { IconPlay } from '../../shared/ui/icons/IconPlay';
import { IconPause } from '../../shared/ui/icons/IconPause';
import { IconVolume } from '../../shared/ui/icons/IconVolume';
import { Wave } from '../../shared/ui/Wave/Wave';
import styles from './Player.module.css';

export const Player = ({ player, accentColor }: PlayerProps) => {
	const {
		currentStation,
		isPlaying,
		volume,
		playError,
		setVolume,
		play,
		stop,
	} = player;

	const handlePlayPause = () => {
		if (!currentStation) return;
		if (isPlaying) stop();
		else play(currentStation);
	};

	return (
		<aside
			className={`${styles.panel} ${isPlaying ? styles.isPlaying : ''}`}
			style={{ '--accent': accentColor } as React.CSSProperties}
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
				{currentStation ? getInitial(currentStation.name) : '♪'}
			</div>

			<div className={styles.info}>
				<div
					className={styles.name}
					title={currentStation?.name}
				>
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
						type='range'
						min={0}
						max={1}
						step={0.01}
						value={volume}
						onChange={(e) => setVolume(Number(e.target.value))}
					/>
				</div>
			</div>

			<Wave active={isPlaying} />
		</aside>
	);
};
