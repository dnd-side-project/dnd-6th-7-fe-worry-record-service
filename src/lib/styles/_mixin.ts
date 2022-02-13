import {
	btn_lgSize,
	btn_mdSize,
	btn_smSize,
	common_btnFont,
	h1_fontSize,
	h2_fontSize,
	h3_fontSize,
	h4_fontSize,
	h5_fontSize,
	h6_fontSize,
} from './_variable';
import { theme, color } from './palette';
import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevice,
} from '@lib/util/helper';
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

export const ButtonLargeFilled = (
	bgColor: string,
	fontColor?: string,
): string => {
	return `
    font-size: ${fontSizeByValue(16, heightDevice())}px;
    ${common_btnFont}
    ${btn_lgSize}
    background-color: ${bgColor};
    color: ${fontColor || theme.color.darkGray};
    `;
};

export const Button_largeShaded = (fontColor?: string): string => {
	return `
     font-size: ${fontSizeByValue(16, heightDevice())}px;
    ${common_btnFont}
     ${btn_lgSize}
    background-color: rgba(255,255,255, 0.1);
    color: ${fontColor || theme.color.darkGray};
    `;
};

export const Button_largeInactive = (): string => {
	return `
    font-size: ${fontSizeByValue(16, heightDevice())}px;
    ${common_btnFont}
     ${btn_lgSize}
    background-color: rgba(255,255,255, 0.1);
    color: ${theme.color.lightGray};
    `;
};

export const Button_mediumFilled = (
	bgColor: string,
	fontColor?: string,
): string => {
	return `
    font-size: ${fontSizeByValue(12, heightDevice())}px;
    ${common_btnFont}
    ${btn_mdSize}
    background-color: ${bgColor};
    color: ${fontColor || theme.color.darkGray};
    `;
};

export const Button_mediumShaded = (fontColor?: string): string => {
	return `
    font-size: ${fontSizeByValue(12, heightDevice())}px;
    ${common_btnFont}
    ${btn_mdSize}
    background-color: rgba(255,255,255, 0.1);
    color: ${fontColor || theme.color.darkGray};
    `;
};

export const Button_mediumInactive = (): string => {
	return `
    font-size: ${fontSizeByValue(12, heightDevice())}px;
    ${common_btnFont}
    ${btn_mdSize}
    background-color: rgba(255,255,255, 0.1);
    color: ${theme.color.lightGray};
    `;
};

export const Button_smallFilled = (
	bgColor: string,
	fontColor?: string,
): string => {
	return `
    font-size: ${fontSizeByValue(12, heightDevice())}px;
    padding: 10px 14px;
    ${common_btnFont}
    ${btn_smSize}
    background-color: ${bgColor};
    color: ${fontColor || theme.color.black};
    `;
};

export const Button_smallShaded = (fontColor?: string): string => {
	return `
    font-size: ${fontSizeByValue(12, heightDevice())}px;
    padding: 10px 14px;
    ${common_btnFont}
    ${btn_smSize}
    background-color: rgba(255,255,255, 0.1);
    color: ${fontColor || theme.color.black};
    `;
};

export const Header1_normal = (fontColor?: string): string => {
	return `
    font-size: ${fontSizeByValue(h1_fontSize, heightDevice())}px;
    font-weight: 200;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header1_bold = (fontColor?: string): string => {
	return `
    font-size: ${fontSizeByValue(h1_fontSize, heightDevice())}px;
    font-weight: bold;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header2_600 = (fontColor?: string): string => {
	return `
    font-size: ${fontSizeByValue(h2_fontSize, heightDevice())}px;
    font-weight: 600;
    font-style: normal;
    color: ${fontColor || theme.color.black};
  
    `;
};

export const Header3_bold = (fontColor?: string): string => {
	return `
    font-size: ${fontSizeByValue(h3_fontSize, heightDevice())}px;
    font-weight: bold;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header4_normal = (fontColor?: string): string => {
	return `
  font-size: ${fontSizeByValue(h4_fontSize, heightDevice())}px;
    font-weight: 200;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header4_bold = (fontColor?: string): string => {
	return `
  font-size: ${fontSizeByValue(h4_fontSize, heightDevice())}px;
    font-weight: bold;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header5_300 = (fontColor?: string): string => {
	return `
    font-size: ${h5_fontSize};
    font-weight: 300;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header5_normal = (fontColor?: string): string => {
	return `
   font-size: ${fontSizeByValue(h5_fontSize, heightDevice())}px;
    font-weight: normal;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header5_bold = (fontColor?: string): string => {
	return `
 font-size: ${fontSizeByValue(h5_fontSize, heightDevice())}px;
    font-weight: bold;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header6_normal = (fontColor?: string): string => {
	return `
   font-size: ${fontSizeByValue(h6_fontSize, heightDevice())}px;
    font-weight: normal;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};

export const Header6_bold = (fontColor?: string): string => {
	return `
    font-size: ${fontSizeByValue(h6_fontSize, heightDevice())}px;
    font-weight: bold;
    font-style: normal;
    color: ${fontColor || theme.color.black};
    `;
};
