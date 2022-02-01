import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface DirectionProps {
	x: number;
	y: number;
}

export interface GradientWrapperProps {
	children: any;
	colors: string[];
	start?: DirectionProps;
	end?: DirectionProps;
	style?: any;
	[rest: string]: any;
}

const GradientWrapper: FC<GradientWrapperProps> = ({
	children,
	colors,
	start,
	end,
	style,
	...rest
}) => {
	return (
		<LinearGradient
			{...rest}
			style={[styles.container, style]}
			colors={colors}
			start={start}
			end={end}
		>
			{children}
		</LinearGradient>
	);
};

export default GradientWrapper;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
