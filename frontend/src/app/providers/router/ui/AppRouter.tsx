import { Routes, Route, Navigate, useLocation } from 'react-router';
import { RadioPage } from '@/pages/radio/RadioPage';
import { AuthPage } from '@/pages/auth/ui/AuthPage/AuthPage';
import { ResetPasswordPage } from '@/pages/auth/ui/ResetPasswordPage/ResetPasswordPage';
import { NewPasswordPage } from '@/pages/auth/ui/NewPasswordPage/NewPasswordPage';
import { ProfilePage } from '@/pages/profile/ui/ProfilePage/ProfilePage';
import { MiniPlayer } from '@/widgets/player/ui/MiniPlayer/MiniPlayer';
import { PublicRoute } from '../guards/PublicRoute';
import { PrivateRoute } from '../guards/PrivateRoute';

export const AppRouter = () => {
	const { pathname } = useLocation();

	// На радио-странице есть полная боковая панель плеера — мини-док там не нужен.
	const showMiniPlayer = pathname !== '/';

	return (
		<>
			<Routes>
				<Route path="/" element={<RadioPage />} />

				<Route element={<PublicRoute />}>
					<Route path="/auth" element={<AuthPage />} />
					<Route path="/auth/reset-password" element={<ResetPasswordPage />} />
				</Route>

				<Route path="/auth/new-password" element={<NewPasswordPage />} />

				<Route element={<PrivateRoute />}>
					<Route path="/profile" element={<ProfilePage />} />
				</Route>

				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>

			{showMiniPlayer && <MiniPlayer />}
		</>
	);
};
