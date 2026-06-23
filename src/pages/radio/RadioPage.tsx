import { GenreTags } from '../../features/genre-filter/GenreTags';
import { StationList } from '../../widgets/station-list/StationList';
import { Player } from '../../widgets/player/Player';
import { useRadioPage } from './useRadioPage';
import styles from './RadioPage.module.css';

export const RadioPage = () => {
	const {
		genre,
		setGenre,
		stations,
		loading,
		error,
		player,
		likedIds,
		accentColor,
		handleLike,
	} = useRadioPage();

	return (
		<div className={styles.shell}>
			<header className={styles.header}>
				<div className={styles.brand}>
					<div className={styles.wordmark}>
						<span className={styles.wordmarkKaif}>kaif</span>
						<span className={styles.wordmarkRadio}>radio</span>
					</div>
					<div className={styles.tagline}>
						<span className={styles.liveDot} />
						chill vibes, always on
					</div>
				</div>
				<div className={styles.stat}>
					<div className={styles.statNum}>{stations.length}</div>
					<div className={styles.statLbl}>станций в эфире</div>
				</div>
			</header>

			<div className={styles.grid}>
				<main>
					<div className={styles.genresWrap}>
						<GenreTags activeGenre={genre} onSelect={setGenre} />
					</div>
					<h2 className={styles.sectionHead}>
						эфир <span className={styles.count}>· {stations.length}</span>
					</h2>
					<StationList
						stations={stations}
						loading={loading}
						error={error}
						currentStationId={player.currentStation?.stationuuid ?? null}
						isPlaying={player.isPlaying}
						likedIds={likedIds}
						onSelect={player.play}
						onLike={handleLike}
					/>
				</main>

				<Player player={player} accentColor={accentColor} />
			</div>
		</div>
	);
};
