import React, { FC, memo, ReactElement } from 'react';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevice,
	responsiveWidth as wp,
} from '@lib/util/helper';

import IconCloseLock from '@assets/image/close_lock.svg';
import IconJinro from '@assets/image/jinro.svg';
import IconRelationship from '@assets/image/relationship.svg';
import IconEconomy from '@assets/image/economy.svg';
import IconStudy from '@assets/image/study.svg';
import IconWork from '@assets/image/work.svg';
import IconFamily from '@assets/image/family.svg';

import { theme } from '@lib/styles/palette';
import { Header2_600, Header6_bold, Header6_normal } from '@lib/styles/_mixin';

import GradientWrapper from '@components/GradientWrapper';

export interface WorryEachProps {
	id: number;
	title: string;
	content: string;
	isOpen: boolean;
}

interface WorryProps {
	item: WorryEachProps;
	index: number;
}

const Worries: FC<WorryProps> = ({ item, index }: WorryProps) => {
	const getTagIcon = (): ReactElement | undefined => {
		switch (item.content) {
			case '진로':
				return <IconJinro style={styles.iconWrapper} />;
			case '관계':
				return <IconRelationship style={styles.iconWrapper} />;
			case '경제':
				return <IconEconomy style={styles.iconWrapper} />;
			case '학업':
				return <IconStudy style={styles.iconWrapper} />;
			case '직장':
				return <IconWork style={styles.iconWrapper} />;
			case '가족':
				return <IconFamily style={styles.iconWrapper} />;

			default:
				return;
		}
	};
	return (
		<CardWrapper index={index}>
			{getTagIcon()}
			<CardTitle />
			<GradientWrapper
				style={styles.cardContents}
				angle={117.5}
				colors={['rgba(255, 255, 255, 0) 0%', 'rgba(255, 255, 255, 0.1) 100%']}
			>
				<CardConent>
					<TagWrapper>
						<Tag>{item.content}</Tag>
					</TagWrapper>
					<ContentsWrapper>
						<Date>{item.title}</Date>
						<DateLeftWrapper>
							{item.isOpen ? (
								<DefaultButton>
									<Open>걱정을 확인해보세요</Open>
								</DefaultButton>
							) : (
								<DefaultButton>
									<IconCloseLock />
									<DateLeft>잠금해제</DateLeft>
								</DefaultButton>
							)}
						</DateLeftWrapper>
					</ContentsWrapper>
				</CardConent>
			</GradientWrapper>
		</CardWrapper>
	);
};

export default memo(Worries);

const styles = StyleSheet.create({
	iconWrapper: {
		position: 'absolute',
		left: 0,
		top: 10,
		zIndex: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
	},
	cardContents: {
		borderRadius: 20,
		borderColor: theme.color.lightWhite,
		borderWidth: 1,
		borderStyle: 'solid',
	},
});

const CardWrapper = styled.View<{ index: number }>`
	height: 158px;
	max-height: 158px;
	flex: 0.5;
	border-radius: 19px;
	margin-right: ${props => (props.index % 2 === 0 ? wp('5%') : 0)}px;
	margin-bottom: ${props => (props.index % 2 === 0 ? wp('5%') : 0)}px;
`;
const CardTitle = styled.Text`
	flex: 0.4;
`;

const CardConent = styled.View`
	flex: 1;
	padding: 12px 12px 18px 18px;
	justify-content: space-between;
`;
const ContentsWrapper = styled.View``;

const Date = styled.Text`
	${Header2_600(theme.color.white)}
`;

const TagWrapper = styled.View`
	border-radius: 30px;
	background-color: rgba(15, 15, 21, 0.5);
	align-self: flex-end;
`;

const Tag = styled.Text`
	${Header6_normal(theme.color.white)}
	font-size: ${fontSizeByValue(11)}px;
	padding: 4px 10px;
`;

const DateLeftWrapper = styled.View`
	flex-direction: row;
	align-items: center;
	padding-top: 8px;
`;

const DefaultButton = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const DateLeft = styled.Text`
	${Header6_normal(theme.color.white)}
	font-size: ${fontSizeByValue(10)}px;
	margin-left: 5px;
`;

const Open = styled.Text`
	${Header6_bold(theme.color.white)}
	font-size: ${fontSizeByValue(10)}px;
`;
