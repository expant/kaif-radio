export const STATION_COLORS = [
	'var(--coral)',
	'var(--cobalt)',
	'var(--violet)',
	'var(--amber)',
	'var(--pink)',
	'var(--green)',
] as const;

export const STATION_COLORS_HEX: Record<string, string> = {
	'var(--coral)': '#FF5A3C',
	'var(--cobalt)': '#2C57FF',
	'var(--violet)': '#7C3AED',
	'var(--amber)': '#FFAE17',
	'var(--pink)': '#FF4D9D',
	'var(--green)': '#0FB877',
};

export const getStationColor = (index: number): string =>
	STATION_COLORS[index % STATION_COLORS.length];

export const getStationColorHex = (index: number): string =>
	STATION_COLORS_HEX[getStationColor(index)] ?? '#FF5A3C';

export const getInitial = (name: string): string =>
	name
		.replace(/[^A-Za-z0-9 ]/g, '')
		.trim()
		.charAt(0)
		.toUpperCase() || '?';
