import { usePlayer } from '../../model/hooks/usePlayer';
import { IconPlay } from '@/shared/ui/icons/IconPlay';
import { IconPause } from '@/shared/ui/icons/IconPause';
import type { PlayPauseButtonProps } from '../../model/types';
import styles from './PlayPauseButton.module.css';

export const PlayPauseButton = ({ size = 30 }: PlayPauseButtonProps) => {
	const { currentStation, isPlaying, play } = usePlayer();

	const handleClick = () => {
		if (!currentStation) return;
		play(currentStation);
	};

	return (
		<button
			className={styles.btn}
			onClick={handleClick}
			disabled={!currentStation}
			aria-label={isPlaying ? 'Пауза' : 'Играть'}
		>
			{isPlaying ? <IconPause size={size} /> : <IconPlay size={size} />}
		</button>
	);
};
