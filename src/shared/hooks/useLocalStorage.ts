import { useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
	const [value, setValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch {
			return initialValue;
		}
	});

	const set = (newValue: T) => {
		setValue(newValue);
		try {
			localStorage.setItem(key, JSON.stringify(newValue));
		} catch {
			// localStorage недоступен
		}
	};

	return [value, set] as const;
};
