import { Routes, Route, Navigate } from 'react-router';
import { RadioPage } from '@/pages/radio/RadioPage';
import { AuthPage } from '@/pages/auth/ui/AuthPage/AuthPage';
import { PublicRoute } from '../guards/PublicRoute';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<RadioPage />} />

			<Route element={<PublicRoute />}>
				<Route path="/auth" element={<AuthPage />} />
			</Route>

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};
