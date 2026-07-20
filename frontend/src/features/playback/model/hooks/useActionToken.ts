import { useRef } from 'react';
import type { ActionToken } from '../types';

export const useActionToken = (): ActionToken => {
	const ref = useRef(0);

	return {
		next: () => ++ref.current,
		current: () => ref.current,
		isCurrent: (token) => token === ref.current,
	};
};
