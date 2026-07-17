import { usePlayer } from '../../model/hooks/usePlayer';
import { IconVolume } from '@/shared/ui/icons/IconVolume';
import type { VolumeControlProps } from '../../model/types';
import styles from './VolumeControl.module.css';

export const VolumeControl = ({ size = 22 }: VolumeControlProps) => {
	const { volume, setVolume } = usePlayer();

	return (
		<div className={styles.control}>
			<IconVolume size={size} />
			<input
				type="range"
				min={0}
				max={1}
				step={0.01}
				value={volume}
				onChange={(e) => setVolume(Number(e.target.value))}
				aria-label="Громкость"
			/>
		</div>
	);
};
