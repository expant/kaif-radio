import type { LogoutButtonProps } from '../model/types';
import { useLogout } from '../model/hooks/useLogout';
import { IconLogout } from '@/shared/ui/icons/IconLogout';
import styles from './LogoutButton.module.css';

export const LogoutButton = ({ className }: LogoutButtonProps) => {
	const { loading, handleLogout } = useLogout();

	return (
		<button
			className={`${styles.btn} ${className ?? ''}`}
			aria-label="Выйти"
			disabled={loading}
			onClick={handleLogout}
		>
			<IconLogout size={20} />
		</button>
	);
};
