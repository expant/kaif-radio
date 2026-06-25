import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/shared/api/supabaseClient';
import { AuthContext } from './context';
import type { AuthProviderProps } from './types';

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [session, setSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setIsLoading(false);
		});

		const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => listener.subscription.unsubscribe();
	}, []);

	return <AuthContext.Provider value={{ session, isLoading }}>{children}</AuthContext.Provider>;
};
