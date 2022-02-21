import {
  h1_fontSize,
  h2_fontSize,
  h3_fontSize,
  h4_fontSize,
  h5_fontSize,
  h6_fontSize,
} from './_variable';
import { theme, color } from './palette';

export const makeBoxShadow = (
  color: string,
  width: number,
  height: number,
  opacity: number,
  radius: number,
  elevation: number,
): string => {
  return `
    shadowColor: ${color},
    shadowOffset: {
      width: ${width},
      height: ${height},
    },
    shadowOpacity: ${opacity},
    shadowRadius:${radius},
    elevation: ${elevation},`;
};

export const Header1_normal = (fontColor?: string): string => {
  return `
    font-size: ${h1_fontSize}px;
    font-weight: 200;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header1_bold = (fontColor?: string): string => {
  return `
    font-size: ${h1_fontSize}px;
    font-weight: bold;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header2_600 = (fontColor?: string): string => {
  return `
    font-size: ${h2_fontSize}px;
    font-weight: 600;
    font-style: normal;
    color: ${fontColor || theme.color.black};
  
    `;
};

export const Header3_bold = (fontColor?: string): string => {
  return `
    font-size: ${h3_fontSize}px;
    font-weight: bold;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header4_normal = (fontColor?: string): string => {
  return `
    font-size: ${h4_fontSize}px;
    font-weight: 200;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header4_bold = (fontColor?: string): string => {
  return `
    font-size: ${h4_fontSize}px;
    font-weight: bold;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header5_300 = (fontColor?: string): string => {
  return `
    font-size: ${h5_fontSize}px;
    font-weight: 300;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header5_normal = (fontColor?: string): string => {
  return `
   font-size: ${h5_fontSize}px;
    font-weight: normal;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header5_bold = (fontColor?: string): string => {
  return `
 font-size: ${h5_fontSize}px;
    font-weight: bold;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header6_normal = (fontColor?: string): string => {
  return `
   font-size: ${h6_fontSize}px;
    font-weight: normal;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header6_bold = (fontColor?: string): string => {
  return `
    font-size: ${h6_fontSize}px;
    font-weight: bold;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};
