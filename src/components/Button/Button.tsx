/* eslint-disable no-mixed-spaces-and-tabs */
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';
import { theme, StyledColorProps } from '~/lib/styles/palette';

import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevice,
	responsiveWidth as wp,
} from '@lib/util/helper';
import { GradientWrapperProps } from '@components/GradientWrapper/GradientWrapper';
import GradientWrapper from '@components/GradientWrapper';

type StyledButtonProps = StyledColorProps & {
	isBorder?: boolean;
	isBold?: boolean;
	isBorderRadius?: boolean;
	fontSize?: number;
	width: number;
	height: number;
	icon?: any;
};

type GButtonProps = Pick<
	GradientWrapperProps,
	'colors' | 'start' | 'end' | 'style'
> & {
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
					start={gradientWrapper.start}
					end={gradientWrapper.end}
					colors={gradientWrapper.colors}
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
	padding-vertical: 5px;
	padding-horizontal: 5px;
	align-self: flex-start;
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
	width: ${props => props?.width || 100}%;
	height: ${props => props?.height || 100}%;
`;

const TransparentButton = styled(DefaultButton)`
	background-color: transparent;
`;

const ButtonWrapper = styled.View<StyledButtonProps>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 0 20px;
`;

const ButtonName = styled.Text<StyledButtonProps>`
	font-size: ${props =>
		fontSizeByValue(props.fontSize || 11, heightDevice())}px;
	color: ${props => theme.color[props.color?.color || 'white']};
	font-weight: ${props => (props?.isBold ? 'bold' : 'normal')};
	text-align: center;
	flex: 1;
`;
