import { useState } from 'react';
import { logout } from '../../api/logout';
import type { UseLogoutReturn } from '../types';

export const useLogout = (): UseLogoutReturn => {
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		setLoading(true);
		try {
			await logout();
		} finally {
			setLoading(false);
		}
	};

	return { loading, handleLogout };
};
