import { BrowserRouter } from 'react-router';
import { AuthProvider } from '@/features/auth/model/AuthProvider';
import { PlayerProvider } from '@/widgets/player/model/PlayerProvider';
import { AppRouter } from './providers/router/ui/AppRouter';

export const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<PlayerProvider>
					<AppRouter />
				</PlayerProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};
