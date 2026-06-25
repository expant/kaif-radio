import { useState } from 'react';
import { useAuth } from '@/features/auth/model/hooks/useAuth';

export const useProfilePage = () => {
	const { session } = useAuth();
	const [editOpen, setEditOpen] = useState(false);

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
	};
};
