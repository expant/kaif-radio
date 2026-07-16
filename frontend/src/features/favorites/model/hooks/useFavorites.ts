import { useContext } from 'react';
import { FavoritesContext } from '../context';

export const useFavorites = () => useContext(FavoritesContext);
