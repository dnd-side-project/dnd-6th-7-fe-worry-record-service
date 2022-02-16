import React, { FC } from 'react';
import styled from 'styled-components/native';
import { LoginProps } from '~/types/Navigation';
import AppLayout from '@components/AppLayout';
import LoginCP from '@components/Login';

import IconLogin from '@assets/image/icon_login.svg';

import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevice,
	responsiveWidth as wp,
	responsiveHeight as hp,
} from '@lib/util/helper';
import { theme } from '~/lib/styles/palette';

const Login: FC<LoginProps> = ({ navigation }) => {
	return (
		<AppLayout noHeader>
			<IconWrapper>
				<IconLogin height={'100%'} />
			</IconWrapper>

			<LoginCP navigation={navigation} />
		</AppLayout>
	);
};

export default Login;

const IconWrapper = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	flex: 1.2;
`;
