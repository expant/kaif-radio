import { useContext } from 'react';
import { PlayerContext } from '../context';
import type { PlayerState } from '../types';

export const usePlayer = (): PlayerState => useContext(PlayerContext);
