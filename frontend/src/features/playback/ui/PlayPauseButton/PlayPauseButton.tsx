import { usePlayer } from '../../model/hooks/usePlayer';
import { IconPlay } from '@/shared/ui/icons/IconPlay';
import { IconPause } from '@/shared/ui/icons/IconPause';
import { isPlaybackActive } from '../../model/isPlaybackActive';
import type { PlayPauseButtonProps } from '../../model/types';
import styles from './PlayPauseButton.module.css';

export const PlayPauseButton = ({ size = 30 }: PlayPauseButtonProps) => {
	const { currentStation, status, togglePlay } = usePlayer();
	const active = isPlaybackActive(status);

	const handleClick = () => {
		if (!currentStation) return;

		togglePlay(currentStation);
	};

	return (
		<button
			className={styles.btn}
			onClick={handleClick}
			disabled={!currentStation}
			aria-label={active ? 'Пауза' : 'Играть'}
		>
			{active ? <IconPause size={size} /> : <IconPlay size={size} />}
		</button>
	);
};
