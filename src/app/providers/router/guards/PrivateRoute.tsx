import { Outlet, Navigate } from 'react-router';
import { useAuth } from '@/features/auth/model/hooks/useAuth';

export const PrivateRoute = () => {
	const { session, isLoading } = useAuth();

	if (isLoading) return null;

	return session ? <Outlet /> : <Navigate to="/auth" replace />;
};
