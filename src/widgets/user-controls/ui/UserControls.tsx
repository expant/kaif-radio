import { Link } from 'react-router';
import { useAuth } from '@/features/auth/model/hooks/useAuth';
import { IconLogout } from '@/shared/ui/icons/IconLogout';
import styles from './UserControls.module.css';

export const UserControls = () => {
	const { session } = useAuth();

	if (!session) {
		return (
			<Link to="/auth" className={styles.signInBtn}>
				войти
			</Link>
		);
	}

	const initial = session.user.email?.[0].toUpperCase() ?? '?';

	return (
		<div className={styles.controls}>
			<button className={styles.profileBtn} aria-label="Профиль">
				<span className={styles.avatar}>{initial}</span>
			</button>
			<button className={styles.logoutBtn} aria-label="Выйти">
				<IconLogout size={18} />
			</button>
		</div>
	);
};

