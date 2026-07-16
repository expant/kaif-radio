import { type CSSProperties } from 'react';
import {
	getStationColor,
	getStationColorHex,
	getStationColorSeed,
} from '../../../../shared/utils/stationColor';
import { IconPlay } from '../../../../shared/ui/icons/IconPlay';
import { IconListeners } from '../../../../shared/ui/icons/IconListeners';
import { IconPause } from '../../../../shared/ui/icons/IconPause';
import { StationAvatar } from '../../../../shared/ui/StationAvatar/StationAvatar';
import type { StationItemProps } from '../../model/types';
import styles from './StationItem.module.css';

export const StationItem = ({
	station,
	isActive,
	isPlaying,
	isEntering,
	onSelect,
	renderFavoriteButton,
}: StationItemProps) => {
	const seed = getStationColorSeed(station.stationuuid);
	const color = getStationColor(seed);
	const colorHex = getStationColorHex(seed);

	const isCurrentPlaying = isActive && isPlaying;

	return (
		<li
			className={`${styles.row} ${isCurrentPlaying ? styles.playing : ''} ${
				isEntering ? styles.enter : ''
			}`}
			style={{ '--rc': color } as CSSProperties}
			onClick={() => onSelect(station, colorHex)}
		>
			<div className={styles.tile}>
				<StationAvatar name={station.name} favicon={station.favicon} color={color} />
			</div>

			<div className={styles.metaMain}>
				<div className={styles.rname}>{station.name}</div>
				<div className={styles.rmeta}>
					{station.country && <span>{station.country}</span>}
					{station.country && station.bitrate > 0 && <span className={styles.dot} />}
					{station.bitrate > 0 && <span className={styles.kbps}>{station.bitrate} kbps</span>}
				</div>
			</div>

			{station.votes > 0 && (
				<span className={styles.votes}>
					<IconListeners size={14} />
					{station.votes}
				</span>
			)}

			{renderFavoriteButton?.(station)}

			<button
				className={styles.playBtn}
				onClick={(e) => {
					e.stopPropagation();
					onSelect(station, colorHex);
				}}
				aria-label={isCurrentPlaying ? 'Пауза' : 'Играть'}
			>
				{isCurrentPlaying ? <IconPause /> : <IconPlay />}
			</button>
		</li>
	);
};
