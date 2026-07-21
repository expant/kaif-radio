import type { IconProps } from './types';

export const IconVolume = ({ size = '1em' }: IconProps) => (
	<svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
		<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" />
	</svg>
);
