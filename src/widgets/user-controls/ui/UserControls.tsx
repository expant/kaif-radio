import { Link } from 'react-router';
import { useAuth } from '@/features/auth/model/hooks/useAuth';
import { IconLogout } from '@/shared/ui/icons/IconLogout';
import { IconArrow } from '@/shared/ui/icons/IconArrow';
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

	const username = session.user.user_metadata?.username as string | undefined;
	const initial = (username?.[0] ?? session.user.email?.[0] ?? '?').toUpperCase();

	return (
		<div className={styles.controls}>
			<Link to="/profile" className={styles.chip} title="перейти в профиль">
				<span className={styles.avatar}>{initial}</span>
				<span className={styles.userText}>
					<span className={styles.username}>{username ?? 'профиль'}</span>
					<span className={styles.profileLink}>
						перейти
						<IconArrow size={11} />
					</span>
				</span>
			</Link>

			<button className={styles.logoutBtn} aria-label="Выйти">
				<IconLogout size={20} />
			</button>
		</div>
	);
};
