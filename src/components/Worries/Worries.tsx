import React, { FC } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import styled from 'styled-components/native';

export interface WorryProps {
	id: number;
	title: string;
	content: string;
}

interface WorriesProps {
	counts: number;
	worries: WorryProps[];
}

const renderItem = ({ item }) => (
	<Card>
		<Card.Title>{item.title}</Card.Title>
		<Card.Divider />
		<BodyConent>
			<Text>{item.content}</Text>
		</BodyConent>
	</Card>
);

const Worries: FC<WorriesProps> = ({ counts, worries }) => {
	return (
		<WorriesWrapper>
			<InfoText>{counts}가지 걱정이 남았어요.</InfoText>
			<FlatList
				data={worries}
				renderItem={renderItem}
				keyExtractor={(item, index) => item.id.toString()}
			/>
		</WorriesWrapper>
	);
};

export default Worries;

const WorriesWrapper = styled.View`
	flex: 1;
`;

const InfoText = styled.Text``;

const BodyWrapper = styled.View`
	flex: 1;
`;

const BodyConent = styled.Text`
	font-size: 10px;
`;
