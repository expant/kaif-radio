import { supabase } from '@/shared/api/supabaseClient';

export const logout = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
};
