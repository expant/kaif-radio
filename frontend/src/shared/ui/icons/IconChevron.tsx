type Props = { size?: number | string };

export const IconChevron = ({ size = '1em' }: Props) => (
	<svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
		<path
			d="M9 6l6 6-6 6"
			stroke="currentColor"
			strokeWidth={2.4}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
