import { supabase } from '@/shared/api/supabaseClient';

export const signUp = async (email: string, password: string, username: string) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: { username },
		},
	});

	if (error) throw error;

	return data;
};
