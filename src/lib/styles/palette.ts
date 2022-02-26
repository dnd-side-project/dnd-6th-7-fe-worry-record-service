import { DefaultTheme } from 'styled-components/native';

export const color = {
  black: '#191927',
  darkGray: '#4D4D4D',
  drawerIcon: '#7D7D7D',
  drawerBorder: '#4E4E4E',
  gray: '#8C8C93',
  lightGray: '#B1B1B7',
  lightGray2: '#B5B5B5',
  white: '#ffffff',
  blue: '#3431A5',
  yellow: '#F8E318',
  originalBlack: '#000000',
  lightWhite: '#ffffff1a',
  light2White: '#ffffff2a',
  transparent: 'transparent',
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
