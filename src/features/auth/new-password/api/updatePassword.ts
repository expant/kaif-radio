import { supabase } from '@/shared/api/supabaseClient';

export const updatePassword = async (password: string) => {
	const { error } = await supabase.auth.updateUser({ password });

	if (error) throw error;
};
