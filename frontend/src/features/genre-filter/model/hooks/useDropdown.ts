import { useEffect, useRef, useState } from 'react';

export const useDropdown = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);

	const toggle = () => setOpen((v) => !v);

	const close = () => setOpen(false);

	useEffect(() => {
		if (!open) return;

		const onPointerDown = (e: PointerEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
		};

		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [open]);

	return { open, toggle, close, ref };
};
