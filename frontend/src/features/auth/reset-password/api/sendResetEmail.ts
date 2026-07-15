import { supabase } from '@/shared/api/supabaseClient';

export const sendResetEmail = async (email: string) => {
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/auth/new-password`,
	});

	if (error) throw error;
};
