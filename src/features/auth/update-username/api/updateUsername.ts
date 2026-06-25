import { supabase } from '@/shared/api/supabaseClient';

export const updateUsername = async (username: string) => {
	const { error: authError } = await supabase.auth.updateUser({
		data: { username },
	});

	if (authError) throw authError;

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) throw new Error('no user');

	const { error: dbError } = await supabase.from('profiles').update({ username }).eq('id', user.id);

	// FIXME: message "permission denied for table profiles" - нужно починить политики таблицы profiles
	console.log(dbError);

	if (dbError) throw dbError;
};
