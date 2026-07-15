import type { GenreTagsProps } from '../../model/types';
import styles from './GenreTags.module.css';

export const GenreTags = ({
	genres,
	activeGenre,
	actionSlot,
	favoritesTag,
	onSelect,
	onRemove,
}: GenreTagsProps) => (
	<div className={styles.container}>
		{favoritesTag && (
			<button
				className={`${styles.favoritesTag} ${activeGenre === favoritesTag ? styles.active : ''}`}
				onClick={() => onSelect(favoritesTag)}
			>
				❤️
			</button>
		)}

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
