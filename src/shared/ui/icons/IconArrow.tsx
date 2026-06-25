type Props = {
	size?: number | string;
};

export const IconArrow = ({ size = '1em' }: Props) => (
	<svg viewBox="0 0 24 24" width={size} height={size}>
		<path
			d="M7 17 17 7M9 7h8v8"
			stroke="currentColor"
			strokeWidth={2.4}
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
