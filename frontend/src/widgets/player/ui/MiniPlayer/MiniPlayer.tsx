import type { CSSProperties } from 'react';
import { usePlayer } from '@/features/playback/model/hooks/usePlayer';
import { PlayPauseButton } from '@/features/playback/ui/PlayPauseButton/PlayPauseButton';
import { StationAvatar } from '@/shared/ui/StationAvatar/StationAvatar';
import { FavoriteButton } from '@/features/favorites/ui/FavoriteButton';
import { getStatusText } from '@/features/playback/model/statusText';
import { useMiniPlayerHeight } from '@/widgets/player/model/hooks/useMiniPlayerHeight';
import styles from './MiniPlayer.module.css';

export const MiniPlayer = () => {
	const { currentStation, status, playError, accentColor } = usePlayer();

	const miniPlayerRef = useMiniPlayerHeight<HTMLDivElement>();

	if (!currentStation) return null;

	const sub = getStatusText({ status, playError, detail: currentStation.country });

	return (
		<div ref={miniPlayerRef} className={styles.dock} style={{ '--accent': accentColor } as CSSProperties}>
			<div className={styles.avatar}>
				<StationAvatar
					name={currentStation.name}
					favicon={currentStation.favicon}
					color={accentColor}
				/>
			</div>

			<div className={styles.info}>
				<div className={styles.name} title={currentStation.name}>
					{currentStation.name}
				</div>
				<div className={styles.sub}>{sub}</div>
			</div>

			<FavoriteButton station={currentStation} />

			<PlayPauseButton size={22} />
		</div>
	);
};
