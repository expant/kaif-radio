import type { FavoriteButtonProps } from '../model/types';
import { useAuth } from '@/features/auth/model/hooks/useAuth';
import { useFavorites } from '../model/hooks/useFavorites';
import { IconHeart } from '@/shared/ui/icons/IconHeart';
import { Toast } from '@/shared/ui/Toast/Toast';
import { useState } from 'react';
import styles from './FavoriteButton.module.css';

export const FavoriteButton = ({ station }: FavoriteButtonProps) => {
	const { session } = useAuth();
	const { ids, toggle } = useFavorites();
	const [showAuthToast, setShowAuthToast] = useState(false);

	const isFavorited = ids.has(station.stationuuid);

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!session) {
			setShowAuthToast(true);

			return;
		}

		toggle(station);
	};

	return (
		<>
			{showAuthToast && (
				<Toast message="войди чтобы добавить в избранное" onClose={() => setShowAuthToast(false)} />
			)}
			<button
				className={`${styles.btn} ${isFavorited ? styles.active : ''}`}
				onClick={handleClick}
				aria-label={isFavorited ? 'Убрать из избранного' : 'Добавить в избранное'}
			>
				<IconHeart filled={isFavorited} size={20} />
			</button>
		</>
	);
};
