import { Routes, Route, Navigate } from 'react-router';
import { RadioPage } from '@/pages/radio/RadioPage';
import { AuthPage } from '@/pages/auth/ui/AuthPage/AuthPage';
import { ProfilePage } from '@/pages/profile/ui/ProfilePage/ProfilePage';
import { PublicRoute } from '../guards/PublicRoute';
import { PrivateRoute } from '../guards/PrivateRoute';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<RadioPage />} />

			<Route element={<PublicRoute />}>
				<Route path="/auth" element={<AuthPage />} />
			</Route>

			<Route element={<PrivateRoute />}>
				<Route path="/profile" element={<ProfilePage />} />
			</Route>

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};
