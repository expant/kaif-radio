import { getStationColor, getInitial } from '../../shared/utils/stationColor';
import { IconHeart } from '../../shared/ui/icons/IconHeart';
import { IconPlay } from '../../shared/ui/icons/IconPlay';
import { IconPause } from '../../shared/ui/icons/IconPause';
import type { StationListProps } from './types';
import styles from './StationList.module.css';

export const StationList = ({
	stations,
	loading,
	error,
	currentStationId,
	isPlaying,
	likedIds,
	onSelect,
	onLike,
}: StationListProps) => {
	if (loading) {
		return (
			<div className={styles.state}>
				<div className={styles.loader} />
				<span>Загружаем станции...</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.state}>
				<span className={styles.error}>Ошибка: {error}</span>
			</div>
		);
	}

	if (stations.length === 0) {
		return (
			<div className={styles.state}>
				<span>Станции не найдены</span>
			</div>
		);
	}

	return (
		<ul className={styles.list}>
			{stations.map((station, index) => {
				const isActive = station.stationuuid === currentStationId;
				const isLiked = likedIds.has(station.stationuuid);
				const color = getStationColor(index);
				const initial = getInitial(station.name);

				return (
					<li
						key={station.stationuuid}
						className={`${styles.row} ${isActive && isPlaying ? styles.playing : ''}`}
						style={{ '--rc': color } as React.CSSProperties}
						onClick={() => onSelect(station)}
					>
						<div className={styles.tile}>{initial}</div>

						<div className={styles.metaMain}>
							<div className={styles.rname}>{station.name}</div>
							<div className={styles.rmeta}>
								{station.country && <span>{station.country}</span>}
								{station.country && station.bitrate > 0 && (
									<span className={styles.dot} />
								)}
								{station.bitrate > 0 && (
									<span className={styles.kbps}>{station.bitrate} kbps</span>
								)}
							</div>
						</div>

						<button
							className={`${styles.like} ${isLiked ? styles.liked : ''}`}
							onClick={(e) => {
								e.stopPropagation();
								onLike(station.stationuuid);
							}}
							aria-label='Лайк'
						>
							<IconHeart filled={isLiked} />
							<span>{station.votes}</span>
						</button>

						<button
							className={styles.playBtn}
							onClick={(e) => {
								e.stopPropagation();
								onSelect(station);
							}}
							aria-label={isActive && isPlaying ? 'Пауза' : 'Играть'}
						>
							{isActive && isPlaying ? <IconPause /> : <IconPlay />}
						</button>
					</li>
				);
			})}
		</ul>
	);
};
