import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
export const content = ['./src/**/*.{ts,tsx,css}'];
export const darkMode = 'class';
export const theme = {
	fontFamily: {
		mono: ['"DM Mono"', 'monospace'],
	},
	fontWeight: {
		light: 300,
		medium: 500,
	},
	extend: {
		colors: {
			cream: '#f2ebd4',
		},
	},
};
export const plugins = [require('@tailwindcss/typography')];
