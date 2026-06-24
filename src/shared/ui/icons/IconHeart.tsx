type Props = {
	filled: boolean;
};

export const IconHeart = ({ filled }: Props) => (
	<svg
		viewBox="0 0 24 24"
		fill={filled ? 'currentColor' : 'none'}
		stroke="currentColor"
		strokeWidth={2}
		width="1em"
		height="1em"
	>
		<path d="M12 21s-7.5-4.6-10-9.2C.6 9 1.6 5.6 4.7 4.8 7 4.2 9 5.4 12 8.3c3-2.9 5-4.1 7.3-3.5C22.4 5.6 23.4 9 22 11.8 19.5 16.4 12 21 12 21z" />
	</svg>
);
