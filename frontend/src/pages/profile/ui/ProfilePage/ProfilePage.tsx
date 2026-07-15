import { Link } from 'react-router';
import { useProfilePage } from '../../model/hooks/useProfilePage';
import { UpdateUsernameModal } from '@/features/auth/update-username/ui/UpdateUsernameModal';
import { IconEdit } from '@/shared/ui/icons/IconEdit';
import { IconMail } from '@/shared/ui/icons/IconMail';
import { IconLogout } from '@/shared/ui/icons/IconLogout';
import { IconChevron } from '@/shared/ui/icons/IconChevron';
import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
	const { username, email, initial, editOpen, openEdit, closeEdit, handleLogout } =
		useProfilePage();

	return (
		<div className={styles.shell}>
			<div className={styles.topbar}>
				<Link to="/" className={styles.back}>
					<svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
						<path d="M14 7l-5 5 5 5V7z" />
					</svg>
					в эфир
				</Link>
				<div className={styles.wordmark}>
					<span className={styles.wordmarkKaif}>kaif</span>
					<span className={styles.wordmarkRadio}>radio</span>
				</div>
			</div>

			<h1 className={styles.pageTitle}>профиль</h1>

			<div className={styles.hero}>
				<div className={styles.avatar}>{initial}</div>
				<div className={styles.heroMeta}>
					<div className={styles.metaLabel}>пользователь</div>
					<div className={styles.username} title={username}>
						{username || 'без имени'}
					</div>
					<div className={styles.email}>
						<IconMail size={16} />
						<span>{email}</span>
					</div>
				</div>
				<button className={styles.editBtn} onClick={openEdit}>
					<IconEdit size={17} />
					изменить имя
				</button>
			</div>

			<div className={styles.section}>
				<div className={styles.secTitle}>аккаунт</div>
				<div className={styles.panel}>
					<div className={`${styles.row} ${styles.danger}`} onClick={handleLogout}>
						<div className={styles.rowIco}>
							<IconLogout size={20} />
						</div>
						<div className={styles.rowBody}>
							<div className={styles.rowTitle}>выйти</div>
							<div className={styles.rowSub}>завершить сессию на этом устройстве</div>
						</div>
						<IconChevron size={20} />
					</div>
				</div>
			</div>

			{editOpen && <UpdateUsernameModal currentUsername={username} onClose={closeEdit} />}
		</div>
	);
};
