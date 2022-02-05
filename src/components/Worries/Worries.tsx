import React, { FC, memo } from 'react';

import styled from 'styled-components/native';
import { responsiveWidth as wp } from '@lib/util/helper';
import Worry from '@components/Worry';
import { FlatList } from 'react-native';

export interface WorryProps {
	id: number;
	title: string;
	content: string;
}

interface WorriesProps {
	counts: number;
	worries: WorryProps[];
}

const renderItem = ({ item, index }: { item: WorryProps; index: number }) => (
	<Worry item={item} index={index} />
);

const Worries: FC<WorriesProps> = ({ counts, worries }) => {
	return (
		<WorriesWrapper>
			<InfoText>{counts}가지 걱정이 남았어요.</InfoText>
			<ListWrapper
				data={worries}
				renderItem={renderItem}
				numColumns={2}
				keyExtractor={(item, index) => item.id.toString()}
			/>
		</WorriesWrapper>
	);
};

export default memo(Worries);

const WorriesWrapper = styled.View`
	flex: 1;
`;

const InfoText = styled.Text``;

const ListWrapper = styled.FlatList`
	margin: ${wp('5%')}px;
` as unknown as typeof FlatList;
