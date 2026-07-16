import { BrowserRouter } from 'react-router';
import { AuthProvider } from '@/features/auth/model/AuthProvider';
import { FavoritesProvider } from '@/features/favorites/model/FavoritesProvider';
import { PlayerProvider } from '@/widgets/player/model/PlayerProvider';
import { AppRouter } from './providers/router/ui/AppRouter';

export const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<FavoritesProvider>
					<PlayerProvider>
						<AppRouter />
					</PlayerProvider>
				</FavoritesProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};
