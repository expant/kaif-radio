import { supabase } from '@/shared/api/supabaseClient';
import type { Favorite } from '../model/types';
import type { Station } from '../../station/types';

export const getFavorites = async (userId: string): Promise<Favorite[]> => {
	const { data, error } = await supabase
		.from('favorites')
		.select('*')
		.eq('user_id', userId)
		.order('created_at', { ascending: false });

	if (error) throw error;
	return data;
};

export const addFavorite = async (userId: string, station: Station): Promise<void> => {
	const { error } = await supabase.from('favorites').insert({
		user_id: userId,
		station_uuid: station.stationuuid,
		station_name: station.name,
		station_favicon: station.favicon || null,
	});

	if (error) throw error;
};

export const removeFavorite = async (userId: string, stationUuid: string): Promise<void> => {
	const { error } = await supabase
		.from('favorites')
		.delete()
		.eq('user_id', userId)
		.eq('station_uuid', stationUuid);

	if (error) throw error;
};
