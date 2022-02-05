/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const responsiveFontSizeByPercent = (percent: number) =>
	RFPercentage(percent);

export const responsiveFontSizeByValue = (
	value: number,
	screenHeight?: number,
) => RFValue(value, screenHeight);

export const responsiveWidth = (widthPercent: number | string) =>
	wp(widthPercent);

export const responsiveHeight = (HeightPercent: number | string) =>
	hp(HeightPercent);

export const getHeightDevice = () => Dimensions.get('screen').height;
export const getWidthDevice = () => Dimensions.get('screen').width;
