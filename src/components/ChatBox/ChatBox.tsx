import React, { FC, useCallback } from 'react';
import styled from 'styled-components/native';

import { theme } from '@lib/styles/palette';
import { responsiveWidth as wp } from '~/lib/util/helper';

interface ChatBoxProps {
  height?: number;
  width?: number;
  bgColor?: string;
  fontColor?: string;
  isOposite?: boolean;
  isActive?: boolean;
  id: string;
  value: string;
  onPressEdit?: (id: string) => void;
}

interface ChatBoxStyleProps {
  height?: number;
  width?: number;
  bgColor?: string;
  fontColor?: string;
  isOposite?: boolean;
  isActive?: boolean;
}

const ChatBox: FC<ChatBoxProps> = ({
  value,
  id,
  height,
  width,
  bgColor,
  fontColor,
  isOposite,
  isActive,
  onPressEdit,
}) => {
  const onPressEditHandler = useCallback(() => {
    if (onPressEdit) {
      onPressEdit(id);
    }
  }, [id, onPressEdit]);
  return (
    <>
      {isOposite ? (
        <CardTextOpositeWrapper
          bgColor={bgColor}
          height={height}
          width={width}
          isOposite={isOposite}
          isActive={isActive}
        >
          <UpdateButton onPress={onPressEditHandler}>
            <CardTextOposite fontColor={fontColor} isActive={isActive}>
              {value}
            </CardTextOposite>
          </UpdateButton>
        </CardTextOpositeWrapper>
      ) : (
        <CardTextWrapper
          bgColor={bgColor}
          height={height}
          width={width}
          isOposite={isOposite}
        >
          <CardText fontColor={fontColor}>{value}</CardText>
        </CardTextWrapper>
      )}
    </>
  );
};

export default ChatBox;

const InitTextWrapper = styled.View<ChatBoxStyleProps>`
  border-radius: 10px;
  padding: 14px 16px;
  margin: ${({ isOposite }) => (isOposite === true ? '8px 0' : '6px 0')};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  height: ${({ height }) => (height !== undefined ? `${height}px` : 'auto')};
  max-height: ${({ height }) =>
    height !== undefined ? `${height}px` : 'auto'};
  max-width: ${({ width }) => (width !== undefined ? `${width}px` : 'auto')};
`;

const CardTextWrapper = styled(InitTextWrapper)<ChatBoxStyleProps>`
  border: 1px solid ${theme.color.lightWhite};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  align-self: flex-start;
  max-width: ${wp('80%')}px;
`;

const CardTextOpositeWrapper = styled(InitTextWrapper)<ChatBoxStyleProps>`
  align-self: flex-end;
  background-color: ${({ isActive, bgColor }) => (isActive ? '#fff' : bgColor)};
`;

const InitText = styled.Text<ChatBoxStyleProps>`
  color: ${({ fontColor }) => fontColor || theme.color.white};
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const CardTextOposite = styled(InitText)<ChatBoxStyleProps>`
  color: ${({ isActive, fontColor }) => (isActive ? '#545459' : fontColor)};
`;

const UpdateButton = styled.TouchableOpacity``;

const CardText = styled(InitText)<ChatBoxStyleProps>``;
