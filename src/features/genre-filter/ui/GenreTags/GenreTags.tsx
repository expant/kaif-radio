import type { GenreTagsProps } from '../../model/types';
import styles from './GenreTags.module.css';

export const GenreTags = ({
	genres,
	activeGenre,
	actionSlot,
	onSelect,
	onRemove,
}: GenreTagsProps) => (
	<div className={styles.container}>
		{genres.map((genre) => (
			<div key={genre} className={`${styles.tag} ${activeGenre === genre ? styles.active : ''}`}>
				<button className={styles.label} onClick={() => onSelect(genre)}>
					{genre}
				</button>
				<button
					className={styles.remove}
					onClick={() => onRemove(genre)}
					aria-label={`Удалить ${genre}`}
				>
					×
				</button>
			</div>
		))}
		{actionSlot}
	</div>
);
