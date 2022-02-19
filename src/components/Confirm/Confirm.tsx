import React, { FC, ReactElement } from 'react';
import styled from 'styled-components/native';
import GradientWrapper from '@components/GradientWrapper';
import CustomeButton from '@components/Button';

import { theme } from '@lib/styles/palette';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface ConfirmProps {
  title: string;
  subtitle: string;
  onPressCancel: () => void;
  onPressDelete: () => void;
}

const Confirm: FC<ConfirmProps> = ({
  title,
  subtitle,
  onPressCancel,
  onPressDelete,
}) => {
  return (
    <ConfirmWrapper angle={117.5} colors={['#32323F', '#1F1F2D']}>
      <TitleWrapper>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </TitleWrapper>
      <ButtonWrapper>
        <CustomeButton
          title="취소"
          isBorderRadius
          onPress={onPressCancel}
          backgroundColor={{
            color: 'lightWhite',
          }}
          width={wp('42%')}
          height={52}
          color={{
            color: 'lightGray',
          }}
          fontSize={16}
        />
        <CustomeButton
          title="삭제하기"
          isBorderRadius
          onPress={onPressDelete}
          backgroundColor={{
            color: 'white',
          }}
          width={wp('42%')}
          height={52}
          color={{
            color: 'black',
          }}
          fontSize={16}
        />
      </ButtonWrapper>
    </ConfirmWrapper>
  );
};

export default Confirm;

const ConfirmWrapper = styled(GradientWrapper)`
  padding: 24px;
`;

const TitleWrapper = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  line-height: 28px;
  color: ${theme.color.white};
`;

const SubTitle = styled.Text`
  font-size: 12px;
  line-height: 20px;
  color: ${theme.color.white};
  margin-top: 20px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
