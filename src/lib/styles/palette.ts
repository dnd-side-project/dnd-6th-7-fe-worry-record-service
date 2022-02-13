import { DefaultTheme } from 'styled-components/native';

export const color = {
	black: ' #191927',
	darkGray: '#4D4D4D',
	gray: '#8C8C93',
	lightGray: '#B1B1B7',
	white: '#ffffff',
	blue: '#3431A5',
	yellow: '#F8E318',
};
export const theme: DefaultTheme = {
	color,
};

export type Color = typeof color;

interface BackgroundProps {
	color: keyof Color;
}

export interface StyledColorProps {
	backgroundColor?: BackgroundProps;
	color?: BackgroundProps;
}
