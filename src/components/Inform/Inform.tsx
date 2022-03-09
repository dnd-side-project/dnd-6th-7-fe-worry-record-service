import React, { FC, ReactElement } from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import CustomeButton from '@components/Button';

import { theme } from '@lib/styles/palette';

export interface InformProps {
  visible: boolean;
  onPressConfirm: () => void;
  icon: ReactElement;
  mainTitle: string;
  description: string;
  subTitle: string;
  buttonTitle?: string;
}

const Inform: FC<InformProps> = ({
  visible,
  onPressConfirm,
  icon,
  mainTitle,
  description,
  subTitle,
  buttonTitle,
}) => {
  return (
    <Modal isVisible={visible}>
      <ModalWrapper>
        <ModalTitle>{mainTitle}</ModalTitle>
        <IconWrapper>{icon}</IconWrapper>
        <ModalTitle>{description}</ModalTitle>
        <ModalTitle>{subTitle}</ModalTitle>
      </ModalWrapper>
      <ModalButtonWrapper>
        <CustomeButton
          title={buttonTitle || '확인'}
          isBorderRadius
          onPress={onPressConfirm}
          backgroundColor={{
            color: 'white',
          }}
          height={52}
          color={{
            color: 'black',
          }}
          fontSize={16}
        />
      </ModalButtonWrapper>
    </Modal>
  );
};

export default Inform;

const IconWrapper = styled.View`
  margin: 18px 0;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.color.white};
  line-height: 28px;
`;

const ModalWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalButtonWrapper = styled.View`
  margin-bottom: 36px;
`;
