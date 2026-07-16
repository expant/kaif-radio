import { ErrorMessage } from '../../../../shared/ui/ErrorMessage/ErrorMessage';
import { useEnteringStations } from '../../model/hooks/useEnteringStations';
import { StationItem } from '../StationItem/StationItem';
import type { StationListProps } from '../../model/types';
import styles from './StationList.module.css';

export const StationList = ({
	stations,
	loading,
	error,
	currentStationId,
	isPlaying,
	onSelect,
	renderFavoriteButton,
}: StationListProps) => {
	const entering = useEnteringStations(stations);

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
			<ErrorMessage
				message="что-то пошло не так со станциями"
				hint="попробуй обновить страницу или вернуться чуть позже"
			/>
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
			{stations.map((station) => (
				<StationItem
					key={station.stationuuid}
					station={station}
					isActive={station.stationuuid === currentStationId}
					isPlaying={isPlaying}
					isEntering={entering.has(station.stationuuid)}
					onSelect={onSelect}
					renderFavoriteButton={renderFavoriteButton}
				/>
			))}
		</ul>
	);
};
