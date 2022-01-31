import React, { FC, ReactElement } from 'react';
import styled from 'styled-components/native';
import Header from '@components/Header';
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
			{!noHeader ? (
				<Header
					headerLeft={headerLeft}
					headerRight={headerRight}
					headerCenter={headerCenter}
				/>
			) : null}
			{children}
		</RootWrapper>
	);
};

export default AppLayout;

const RootWrapper = styled.SafeAreaView`
	flex: 1;
	// margin: 0 10px;
`;
