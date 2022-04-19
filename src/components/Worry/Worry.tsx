import React, { FC, memo, ReactElement, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';

import GradientWrapper from '@components/GradientWrapper';

import IconCloseLock from '@assets/image/close_lock.svg';
import IconUnchecked from '@assets/image/unchecked.svg';
import Iconchecked from '@assets/image/checked.svg';

import { theme } from '@lib/styles/palette';
import { Header2_600, Header6_bold, Header6_normal } from '@lib/styles/_mixin';
import { getDate } from '@lib/util/date';

import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';
import {
  CHANGE_MODE_REVIEW,
  CLICK_CHECKBOX,
  SET_WORRY_ID,
  UNLOCK_WORRY,
} from '@context/reducer/archive';

import { ReviewScreenNavigationProp } from '~/types/Navigation';
import { WorryTempProps } from '~/types/Worry';

import { useUnlockWorry } from '@hooks/useWorries';

// TODO: 동일한 12월 24일 걱정을 다중으로 삭제했을때는 가능하지만,
// 일자가 다른 걱정을 삭제할때는 선택한 항목 중 가장 최근날짜가 알림에 나오도록하기
// TODO: 알림 기능 만들기
// TODO: 폰트 적용하기
// TODO: immer 적용하기
interface WorryProps {
  item: WorryTempProps;
  index: number;
}

const Worry: FC<WorryProps> = ({ item, index }: WorryProps) => {
  const tag = '[Worries]';
  const {
    index: tabIndex,
    activeTags,
    activeTagsId,
    isUpdating,
    checkedWorries,
  } = useSceneState();
  const dispatch = useSceneDispatch();
  const navigation = useNavigation<ReviewScreenNavigationProp>();
  const unlockWorry = useUnlockWorry(tabIndex, activeTags, activeTagsId, () => {
    dispatch({
      type: UNLOCK_WORRY,
      values: { isUnlock: true },
    });
  });

  // 각 태그에 알맞는 아이콘 지정하는 함수
  const getTagIcon = (): ReactElement | undefined => {
    switch (item.categoryName) {
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

  // 걱정 선택 함수
  const onChangeCheckBox = useCallback(() => {
    // 로직 수정 필요
    // queryClient.setQueryData(
    //   worriesKeys.worries(String(tabIndex), activeTagsId),
    //   (previous: any) =>
    //     previous.map((worry: WorryTempProps) =>
    //       worry.worryId === item.worryId
    //         ? { ...worry, isChecked: !worry.isChecked }
    //         : worry,
    //     ),
    // );
    console.log(tag, 'onChangeCheckBox');
    dispatch({ type: CLICK_CHECKBOX, values: { id: item.worryId } });
  }, [item.worryId, dispatch]);

  // 잠금해제 버튼 클릭시 이벤트
  const onLongPressUnlock = useCallback((): void => {
    console.log(tag, 'onLongPressUnlock');
    dispatch({
      type: SET_WORRY_ID,
      values: { worryId: item.worryId },
    });
    unlockWorry.mutate(String(item.worryId));
  }, [dispatch, unlockWorry, item.worryId]);

  // 후기 작성 되지 않은 버튼 클릭시 이벤트
  const onLongPressNotReview = useCallback((): void => {
    console.log(tag, 'onLongPressNotReview');
    dispatch({ type: CHANGE_MODE_REVIEW, values: { isReviewing: true } });
    dispatch({
      type: SET_WORRY_ID,
      values: { worryId: item.worryId },
    });
    navigation.navigate('Review');
  }, [dispatch, navigation, item.worryId]);

  return (
    <CardWrapper index={index}>
      {getTagIcon()}
      <CardTitle>
        {isUpdating && (
          <CheckBoxWorry
            right
            size={20}
            checked={checkedWorries.includes(item.worryId)}
            onPress={onChangeCheckBox}
            containerStyle={styles.checkBoxContents}
            uncheckedIcon={<IconUnchecked />}
            checkedIcon={<Iconchecked />}
          >
            {item.categoryName}
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
            <Tag>{item.categoryName}</Tag>
          </TagWrapper>
          <ContentsWrapper>
            <Date>{getDate(item.worryStartDate, 'MM/dd')}</Date>
            <DateLeftWrapper>
              {!item.locked && item.finished && (
                <DefaultButton
                  disabled={isUpdating ? true : false}
                  onLongPress={onLongPressNotReview}
                >
                  <Open numberOfLines={1}>
                    {item?.worryReview || '후기가 작성되지 않았습니다.'}
                  </Open>
                </DefaultButton>
              )}
              {!item.locked && !item.finished && (
                <DefaultButton disabled={isUpdating ? true : false}>
                  <Open>지난 걱정을 확인해보세요</Open>
                </DefaultButton>
              )}
              {item.locked && (
                <DefaultButton
                  disabled={isUpdating ? true : false}
                  onLongPress={onLongPressUnlock}
                >
                  <IconCloseLock />
                  <DateLeft>
                    {getDate(item.worryExpiryDate, 'yy')}년
                    {getDate(item.worryExpiryDate, 'MM')}월
                    {getDate(item.worryExpiryDate, 'dd')}일
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

export default memo(Worry);

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
  font-size: 10px;
  font-weight: 100;
  padding-left: 8px;
`;

const Open = styled.Text`
  ${Header6_bold(theme.color.white)}
  font-size: 10px;
`;

const IconImage = styled.Image`
  position: absolute;
  left: 0;
  top: 10;
  z-index: 10;
`;

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
