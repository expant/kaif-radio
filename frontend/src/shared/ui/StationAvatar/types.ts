export type StationAvatarVariant = 'tile' | 'art';

export type StationAvatarProps = {
	name: string;
	favicon?: string;
	color: string;
	variant?: StationAvatarVariant;
};
