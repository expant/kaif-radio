import { useState } from 'react';
import { useAuth } from '@/features/auth/model/hooks/useAuth';
import { useLogout } from '@/features/auth/logout/model/hooks/useLogout';

export const useProfilePage = () => {
	const { session } = useAuth();
	const [editOpen, setEditOpen] = useState(false);
	const [passwordOpen, setPasswordOpen] = useState(false);
	const [notice, setNotice] = useState<string | null>(null);
	const { handleLogout } = useLogout();

	const username = session?.user.user_metadata?.username as string | undefined;
	const email = session?.user.email ?? '';
	const initial = (username?.[0] ?? email[0] ?? '?').toUpperCase();

	return {
		username: username ?? '',
		email,
		initial,
		editOpen,
		openEdit: () => setEditOpen(true),
		closeEdit: () => setEditOpen(false),
		passwordOpen,
		openPassword: () => setPasswordOpen(true),
		closePassword: () => setPasswordOpen(false),
		onPasswordChanged: () => {
			setPasswordOpen(false);
			setNotice('пароль изменён');
		},
		notice,
		clearNotice: () => setNotice(null),
		handleLogout,
	};
};
