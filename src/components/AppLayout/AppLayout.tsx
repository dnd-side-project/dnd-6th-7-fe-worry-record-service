import React, { FC, ReactElement } from 'react';
import styled from 'styled-components/native';
import Header from '@components/Header';
import { theme } from '@lib/styles/palette';

import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevice,
	responsiveWidth as wp,
	responsiveHeight as hp,
} from '@lib/util/helper';

interface AppLayoutProps {
	noHeader?: boolean;
	headerRight?: ReactElement;
	headerLeft?: ReactElement;
	headerCenter?: ReactElement;
	children: any;
}

const AppLayout: FC<AppLayoutProps> = ({
	noHeader,
	headerRight,
	headerLeft,
	headerCenter,
	children,
}) => {
	return (
		<RootWrapper>
			<RootImageWrapper source={require('@assets/image/bg_login.png')}>
				{!noHeader ? (
					<Header
						headerLeft={headerLeft}
						headerRight={headerRight}
						headerCenter={headerCenter}
					/>
				) : null}
				{children}
			</RootImageWrapper>
		</RootWrapper>
	);
};

export default AppLayout;

const RootWrapper = styled.SafeAreaView`
	flex: 1;
	background: ${theme.color.black};
	font-family: 'SUIT-Regular';
`;
const RootImageWrapper = styled.ImageBackground`
	width: 100%;
	height: 100%;
	padding: ${hp(4)}px ${hp(3)}px ${hp(4)}px ${hp(3)}px;
`;
