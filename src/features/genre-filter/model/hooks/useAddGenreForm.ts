import { useState } from 'react';

export const useAddGenreForm = (onAdd: (genre: string) => void) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');

	const handleOpen = () => setOpen(true);

	const handleChange = (input: string) => setValue(input);

	const handleSubmit = () => {
		if (!value.trim()) return;
		onAdd(value);
		setValue('');
		setOpen(false);
	};

	const handleBlur = () => {
		if (!value.trim()) {
			setOpen(false);
			return;
		}
		handleSubmit();
	};

	return { open, value, handleOpen, handleChange, handleSubmit, handleBlur };
};
