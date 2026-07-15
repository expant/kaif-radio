import { BrowserRouter } from 'react-router';
import { AuthProvider } from '@/features/auth/model/AuthProvider';
import { AppRouter } from './providers/router/ui/AppRouter';

export const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppRouter />
			</AuthProvider>
		</BrowserRouter>
	);
};
