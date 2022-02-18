/* eslint-disable no-mixed-spaces-and-tabs */
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';
import { theme, StyledColorProps } from '~/lib/styles/palette';

import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevice,
	responsiveWidth as wp,
	responsiveHeight as hp,
} from '@lib/util/helper';
import { GradientWrapperProps } from '@components/GradientWrapper/GradientWrapper';
import GradientWrapper from '@components/GradientWrapper';

type StyledButtonProps = StyledColorProps & {
	isBorder?: boolean;
	isBold?: boolean;
	isBorderRadius?: boolean;
	fontSize?: number;
	icon?: any;
	isFlex?: boolean;
	opacity?: number;
};

type GButtonProps = Pick<GradientWrapperProps, 'colors' | 'angle' | 'style'> & {
	isGradient: boolean;
};

type ButtonProps = StyledButtonProps & {
	title: string;
	onPress?: (arg: GestureResponderEvent) => void;
	gradientWrapper?: GButtonProps;
	[rest: string]: any;
};

const Button: FC<ButtonProps> = ({
	title,
	icon,
	onPress,
	gradientWrapper,
	...rest
}) => {
	return (
		<>
			{gradientWrapper?.isGradient ? (
				<GradientWrapper
					style={gradientWrapper.style}
					colors={gradientWrapper.colors}
					angle={gradientWrapper.angle}
				>
					<TransparentButton onPress={onPress} {...rest}>
						<ButtonName {...rest}>{title}</ButtonName>
					</TransparentButton>
				</GradientWrapper>
			) : (
				<CustomeButton onPress={onPress} {...rest}>
					<ButtonWrapper {...rest}>
						{icon && icon}
						<ButtonName {...rest}>{title}</ButtonName>
					</ButtonWrapper>
				</CustomeButton>
			)}
		</>
	);
};

export default Button;

const DefaultButton = styled.TouchableOpacity<StyledButtonProps>`
	padding-vertical: ${hp(0.8)}px;
	padding-horizontal: ${hp(0.8)}px;
	border-radius: ${props => (props.isBorderRadius ? '10px' : 0)};
	align-items: center;
	justify-content: center;
`;

const CustomeButton = styled(DefaultButton)`
	background-color: ${props =>
		theme.color[props.backgroundColor?.color || 'white']};
	border: ${props =>
		props.isBorder
			? `1px solid ${theme.color[props.backgroundColor?.color || 'white']}`
			: 'none'};
	opacity: ${props => props.opacity || 1};
`;

const TransparentButton = styled(DefaultButton)`
	background-color: transparent;
`;

const ButtonWrapper = styled.View<StyledButtonProps>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: ${hp(1)}px ${hp(2)}px;
`;

const ButtonName = styled.Text<StyledButtonProps>`
	font-size: ${props =>
		fontSizeByValue(props.fontSize || 11, heightDevice())}px;
	color: ${props => theme.color[props.color?.color || 'white']};
	font-weight: ${props => (props?.isBold ? 'bold' : '600')};
	text-align: center;
	flex: ${props => (props.isFlex ? 1 : 'none')};
`;
