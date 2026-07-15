import { createContext } from 'react';
import type { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType>({
	session: null,
	isLoading: true,
});
