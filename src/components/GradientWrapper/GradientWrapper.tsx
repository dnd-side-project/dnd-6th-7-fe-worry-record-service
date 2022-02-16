import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export interface GradientWrapperProps {
	children: any;
	colors: string[];
	angle?: number;
	style?: any;
	[rest: string]: any;
}

const GradientWrapper: FC<GradientWrapperProps> = ({
	children,
	colors,
	angle,
	style,
	...rest
}) => {
	return (
		<LinearGradient
			{...rest}
			style={[styles.container, style]}
			colors={colors}
			angle={angle}
			useAngle={true}
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
