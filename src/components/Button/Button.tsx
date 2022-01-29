/* eslint-disable no-mixed-spaces-and-tabs */
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';
import { theme, StyledColorProps } from '~/lib/styles/palette';

type StyledButtonProps = StyledColorProps & {
	isBorder?: boolean;
};

type ButtonProps = StyledButtonProps & {
	title: string;
	onPress?: (arg: GestureResponderEvent) => void;
	[rest: string]: any;
};

const Button: FC<ButtonProps> = ({ title, onPress, ...rest }) => {
	return (
		<CustomeButton onPress={onPress} {...rest}>
			<ButtonName>{title}</ButtonName>
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
`;

const ButtonName = styled.Text`
	color: ${theme.color.black['900']};
`;
