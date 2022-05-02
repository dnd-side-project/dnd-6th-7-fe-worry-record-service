import { Color } from '@lib/styles/palette';

declare module 'styled-components' {
	export interface DefaultTheme {
		color: Color;
	}
}
