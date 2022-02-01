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

type StyledButtonProps = StyledColorProps & {
	isBorder?: boolean;
	isBorderRadius?: boolean;
	fontSize?: number;
};

type ButtonProps = StyledButtonProps & {
	title: string;
	onPress?: (arg: GestureResponderEvent) => void;
	[rest: string]: any;
};

const Button: FC<ButtonProps> = ({ title, onPress, ...rest }) => {
	return (
		<CustomeButton onPress={onPress} {...rest}>
			<ButtonName {...rest}>{title}</ButtonName>
		</CustomeButton>
	);
};

export default Button;

const CustomeButton = styled.TouchableOpacity<StyledButtonProps>`
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

	border-radius: ${props => (props.isBorderRadius ? '5px' : 0)};
	padding-vertical: 6px;
	padding-horizontal: 12px;
	align-self: flex-start;
`;

const ButtonName = styled.Text<StyledButtonProps>`
	font-size: ${props =>
		fontSizeByValue(props.fontSize || 11, heightDevice())}px;
	color: ${props =>
		theme.color[props.color?.color || 'white'][props.color?.weight || '900']};
`;
