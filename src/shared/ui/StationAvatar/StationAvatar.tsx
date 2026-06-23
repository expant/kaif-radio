import { useState } from 'react';
import { getInitial } from '../../utils/stationColor';
import type { StationAvatarProps } from './types';
import styles from './StationAvatar.module.css';

export const StationAvatar = ({
	name,
	favicon,
	color,
	variant = 'tile',
}: StationAvatarProps) => {
	const [faviconFailed, setFaviconFailed] = useState(false);
	const showImage = favicon && !faviconFailed;

	return (
		<div
			className={styles.avatar}
			style={{ backgroundColor: color }}
		>
			{showImage ? (
				<img
					src={favicon}
					alt=''
					className={variant === 'art' ? styles.imageArt : styles.imageTile}
					onError={() => setFaviconFailed(true)}
				/>
			) : (
				<span className={styles.initial}>{getInitial(name)}</span>
			)}
		</div>
	);
};
