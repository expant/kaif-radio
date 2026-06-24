import type { ReactNode } from 'react';

export type GenreTagsProps = {
	genres: string[];
	activeGenre: string;
	actionSlot?: ReactNode;
	onSelect: (genre: string) => void;
	onRemove: (genre: string) => void;
};

export type AddGenreFormProps = {
	validating: boolean;
	onAdd: (genre: string) => void;
};
