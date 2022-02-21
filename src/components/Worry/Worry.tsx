import React, { FC, memo, ReactElement, useCallback } from 'react';
import styled from 'styled-components/native';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import { StyleSheet } from 'react-native';
import { WorryProps as Worry } from '@components/Worries/Worries';

import IconCloseLock from '@assets/image/close_lock.svg';
import IconUnchecked from '@assets/image/unchecked.svg';
import Iconchecked from '@assets/image/checked.svg';

import { theme } from '@lib/styles/palette';
import { Header2_600, Header6_bold, Header6_normal } from '@lib/styles/_mixin';

import GradientWrapper from '@components/GradientWrapper';
import { useSceneDispatch, useSceneState } from '@context/ArchiveContext';
import { CLICK_CHECKBOX } from '@context/reducer/archive';

// TODO: 모든걱정, 의미있는 걱정, 의미없는 걱정 태그 만들기 - 완료
// TODO: 기타 태그, 아이콘 넣기 - 완료
// TODO: 필터 구현하기 - 완료
// TODO: 편집하기 클릭 > 체크박스 표출하기 - 완료 (컨텍스트 만들기)
// TODO: 삭제하기 나오기 > 삭제 기능 추가하기 - 완료
// TODO: 되돌리기 클릭 > 체크된 걱정 init 필요 - 완료
// TODO: 리액트 쿼리 적용하기 - 완료
// TODO: 걱정 후기 작성하기 - 완료
// TODO: 키보드 클릭시 화면 올라가는 것 셋팅 - 완료
// TODO: 후기 배경화면 변경하기 - 완료

// TODO: 동일한 12월 24일 걱정을 다중으로 삭제했을때는 가능하지만,
// 일자가 다른 걱정을 삭제할때는 선택한 항목 중 가장 최근날짜가 알림에 나오도록하기
// TODO: 후기 작성 조건 한줄 만들기
// TODO: 후기 버튼 액티브 색상 변경하기
// TODO: 일림 기능 만들기
// TODO: 폰트 적용하기
// TODO: immer 적용하기

interface WorryProps {
  item: Worry;
  index: number;
  onLongPress: (id: string | number[]) => void;
}

const Worries: FC<WorryProps> = ({ item, index, onLongPress }: WorryProps) => {
  const tag = '[Worries]';

  const { isUpdating } = useSceneState();
  const dispatch = useSceneDispatch();

  const getTagIcon = (): ReactElement | undefined => {
    switch (item.content) {
      case '진로':
        return <IconImage source={require('@assets/image/jinro.png')} />;
      case '관계':
        return <IconImage source={require('@assets/image/relationship.png')} />;
      case '경제':
        return <IconImage source={require('@assets/image/economy.png')} />;
      case '학업':
        return <IconImage source={require('@assets/image/study.png')} />;
      case '직장':
        return <IconImage source={require('@assets/image/work.png')} />;
      case '가족':
        return <IconImage source={require('@assets/image/family.png')} />;
      case '건강':
        return <IconImage source={require('@assets/image/healty.png')} />;
      case '기타':
        return <IconImage source={require('@assets/image/etc.png')} />;
      default:
        return;
    }
  };

  const onChangeCheck = useCallback((): void => {
    console.log(tag, 'onChangeCheck');
    dispatch({ type: CLICK_CHECKBOX, values: { id: item.id } });
  }, [dispatch, item.id]);

  const onLongPressUnlock = useCallback((): void => {
    console.log(tag, 'onLongPressUnlock');
    onLongPress(item.id);
  }, [onLongPress, item.id]);

  return (
    <CardWrapper index={index}>
      {getTagIcon()}
      <CardTitle>
        {isUpdating && (
          <CheckBoxWorry
            right
            size={20}
            checked={item.isChecked}
            onPress={onChangeCheck}
            containerStyle={styles.checkBoxContents}
            uncheckedIcon={<IconUnchecked />}
            checkedIcon={<Iconchecked />}
          >
            {item.content}
          </CheckBoxWorry>
        )}
      </CardTitle>
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
                <DefaultButton disabled={isUpdating ? true : false}>
                  <Open>걱정을 확인해보세요</Open>
                </DefaultButton>
              ) : (
                <DefaultButton
                  disabled={isUpdating ? true : false}
                  onLongPress={onLongPressUnlock}
                >
                  <IconCloseLock />
                  <DateLeft>
                    22년 2월 19일
                    <Unlock> 잠금해제</Unlock>
                  </DateLeft>
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
  cardContents: {
    borderRadius: 20,
    borderColor: theme.color.lightWhite,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  checkBoxContents: {
    padding: 0,
    margin: 0,
    paddingTop: 20,
  },
});

const CardWrapper = styled.View<{ index: number }>`
  height: 158px;
  max-height: 158px;
  flex: 0.5;
  border-radius: 19px;
  margin-right: ${props => (props.index % 2 === 0 ? 24 : 0)}px;
  margin-bottom: ${props => (props.index % 2 === 0 ? 24 : 0)}px;
`;

const CardTitle = styled.Text`
  flex: 0.4;
  align-self: flex-end;
`;

const CheckBoxWorry = styled(CheckBox)``;

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
  font-size: 11px;
  padding: 4px 10px;
`;

const DateLeftWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 12px;
`;

const DefaultButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DateLeft = styled.Text`
  ${Header6_normal(theme.color.white)}
  font-size: 10px;
  font-weight: 400;
  margin-left: 6px;
`;

const Unlock = styled.Text`
  ${Header6_normal(theme.color.white)}

  font-size: 9px;
  padding-left: 6px;
`;

const Open = styled.Text`
  ${Header6_bold(theme.color.white)}
  font-size: 10px;
`;

const IconImage = styled.Image`
  position: absolute;
  left: 0;
  top: 10;
  zindex: 10;
`;
