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
	isBorderRadius?: boolean;
	fontSize?: number;
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
					<ButtonName {...rest}>{title}</ButtonName>
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
	border-radius: ${props => (props.isBorderRadius ? '5px' : 0)};
`;

const CustomeButton = styled(DefaultButton)`
	background-color: ${props =>
		theme.color[props.backgroundColor?.color || 'white'][
			props.backgroundColor?.weight || '900'
		]};
	border: ${props =>
		props.isBorder
			? `1px solid ${
					theme.color[props.backgroundColor?.color || 'white'][
						props.backgroundColor?.weight || '900'
					]
			  }`
			: 'none'};
`;

const TransparentButton = styled(DefaultButton)`
	background-color: transparent;
`;

const ButtonName = styled.Text<StyledButtonProps>`
	font-size: ${props =>
		fontSizeByValue(props.fontSize || 11, heightDevice())}px;
	color: ${props =>
		theme.color[props.color?.color || 'white'][props.color?.weight || '900']};
`;
