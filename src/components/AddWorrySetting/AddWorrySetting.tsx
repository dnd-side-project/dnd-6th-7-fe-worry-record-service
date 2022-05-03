import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components/native';
import DatePicker from 'react-native-date-picker';

import { View, Image, Text, Switch, StyleSheet } from 'react-native';
import { Button, ButtonGroup, withTheme } from 'react-native-elements';

import { theme } from '@lib/styles/palette';
import { th } from 'date-fns/locale';
import WorriesService from '@service/archive';
import { httpClient } from '~/App';

const worriesService = new WorriesService(httpClient);
interface AddWorrySettingProps {
  worryContents: {
    userId: number;
    categoryId: number;
    worryText: string;
    worryExpiryDate: Date;
  };
  setWorryContents: any;
  navigation: any;
}

const worryTags = [
  '#학업',
  '#진로',
  '#관계',
  '#건강',
  '#직장',
  '#가족',
  '#경제',
  '#기타',
];

const AddWorrySetting: FC<AddWorrySettingProps> = ({
  setWorryContents,
  worryContents,
  navigation,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [expireDate, setExpireDate] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [datepickerUp, setDatepickerUp] = useState(false);

  useEffect(() => {
    const isTimeSet = expireDate !== 0;
    const isCategoryIdSet =
      worryContents.categoryId in [0, 1, 2, 3, 4, 5, 6, 7];
    setIsComplete(isTimeSet && isCategoryIdSet);
  }, [worryContents, expireDate]);

  const handleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleExpireDate = (date: number) => {
    setExpireDate(date);
    const expireDate = new Date(Date.now() + date * 60 * 60 * 24 * 1000);
    setWorryContents({ ...worryContents, worryExpiryDate: expireDate });
  };

  const handleWorryTag = (idx: number) => {
    setWorryContents({
      ...worryContents,
      categoryId: idx,
    });
  };

  const postWorry = () => {
    worriesService.addWorry(worryContents).then(res => {
      console.log(worryContents);
      console.log(res?.data);
      navigation.navigate('AddWorryComplete', {
        worryExpiryDate: worryContents.worryExpiryDate,
      });
    });
  };
  return (
    <>
      <View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>분야 선택</Text>
          {/* <Text style={style.titleText2}>추가하기</Text> */}
        </View>
        <View style={style.tagContainer}>
          {worryTags.map((name, idx) => {
            return (
              <TextButton
                key={idx}
                name={name}
                idx={idx}
                categoryId={worryContents.categoryId}
                handleWorryTag={handleWorryTag}
              />
            );
          })}
        </View>
        <View style={style.titleContainer2}>
          <Text style={style.titleText}>알림 예약</Text>
        </View>
        <View>
          <Text
            style={style.detailText}
          >{`시간이 지난 후, 흐릿에 맡긴 걱정을 다시 확인해보세요.
놀라운 경험을 하게 될 거에요.`}</Text>
        </View>
        <View style={style.alarmContainer}>
          <Button
            onPress={() => handleExpireDate(7)}
            title={'7일 뒤 확인'}
            buttonStyle={
              expireDate === 7 ? style.alarmButtonSelected : style.alarmButton
            }
            titleStyle={
              expireDate === 7 ? style.alarmTitleSelected : style.alarmTitle
            }
            containerStyle={style.alarmButtonContainer}
          />
          <Button
            onPress={() => handleExpireDate(14)}
            title={'14일 뒤 확인'}
            buttonStyle={
              expireDate === 14 ? style.alarmButtonSelected : style.alarmButton
            }
            titleStyle={
              expireDate === 14 ? style.alarmTitleSelected : style.alarmTitle
            }
            containerStyle={style.alarmButtonContainer}
          />
          <Button
            onPress={() => handleExpireDate(30)}
            title={'30일 뒤 확인'}
            buttonStyle={
              expireDate === 30 ? style.alarmButtonSelected : style.alarmButton
            }
            titleStyle={
              expireDate === 30 ? style.alarmTitleSelected : style.alarmTitle
            }
            containerStyle={style.alarmButtonContainer}
          />
          <Button
            onPress={() => {
              setDatepickerUp(true);
            }}
            buttonStyle={
              expireDate === -1 ? style.alarmButtonSelected : style.alarmButton
            }
            titleStyle={
              expireDate === -1 ? style.alarmTitleSelected : style.alarmTitle
            }
            title={'확인 날짜 설정하기'}
            containerStyle={style.alarmButtonContainer}
          />
        </View>
        <View style={style.titleContainer2}>
          <Text style={style.titleText}>걱정 숨기기</Text>
          <Text style={style.detailText}>
            {'알림이 울릴 때까지 보고싶지 않은 걱정을 숨길 수 있어요.'}
          </Text>
          <Switch
            style={style.switch}
            trackColor={{ false: `${theme.color.white}10`, true: '#3431A5' }}
            thumbColor={isHidden ? theme.color.white : theme.color.lightGray}
            ios_backgroundColor={'#3e3e3e'}
            onValueChange={handleIsHidden}
            value={isHidden}
          />
        </View>
      </View>
      {!isComplete ? (
        <Button
          title={'모든 설정을 완료해주세요'}
          buttonStyle={style.alarmButton}
          titleStyle={style.confirmButtonTitle}
          containerStyle={style.confirmButtonContainer}
        />
      ) : (
        <Button
          onPress={() => {
            postWorry();
          }}
          title={'걱정 훌훌 털었어!'}
          buttonStyle={style.completeButton}
          titleStyle={style.completeButtonTitle}
          containerStyle={style.confirmButtonContainer}
        />
      )}
      <DatePicker
        modal
        open={datepickerUp}
        mode={'date'}
        date={new Date()}
        onConfirm={date => {
          setExpireDate(-1);
          setWorryContents({
            ...worryContents,
            worryExpiryDate: date,
          });
          setDatepickerUp(false);
        }}
        onCancel={() => {
          setDatepickerUp(false);
        }}
      />
    </>
  );
};

const TextButton = props => {
  const { name, handleWorryTag, categoryId, idx } = props;
  const style = StyleSheet.create({
    button: {
      backgroundColor: 'transparent',
      padding: 0,
    },
    title: {
      color: theme.color.white,
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '700',
      opacity: 0.3,
      marginRight: 18,
    },
    titleSelected: {
      color: theme.color.white,
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '700',
      marginRight: 18,
    },
    container: {
      margin: 0,
      marginVertical: 0,
      padding: 0,
    },
  });
  return (
    <Button
      onPress={() => {
        handleWorryTag(idx);
      }}
      title={name}
      buttonStyle={style.button}
      titleStyle={idx === categoryId ? style.titleSelected : style.title}
      containerStyle={style.container}
    />
  );
};

export default AddWorrySetting;

const style = StyleSheet.create({
  titleContainer: {
    marginTop: 28,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  titleContainer2: {
    marginTop: 60,
    justifyContent: 'space-between',
  },
  titleText: {
    color: theme.color.white,
    fontWeight: '700',
    lineHeight: 24,
  },
  titleText2: {
    color: theme.color.gray,
    fontWeight: '700',
  },
  tagContainer: {
    marginTop: 8,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignContent: 'space-between',
    flexDirection: 'row',
    width: 268,
    height: 62,
    flexWrap: 'wrap',
  },
  detailText: {
    fontSize: 10,
    lineHeight: 16,
    color: theme.color.white,
    fontWeight: '200',
  },
  alarmContainer: {
    height: 104,
    marginTop: 16,
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  alarmButton: {
    backgroundColor: `${theme.color.white}10`,
    borderRadius: 10,
  },
  alarmButtonSelected: {
    backgroundColor: `${theme.color.white}`,
    borderRadius: 10,
  },
  alarmTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 24,
    color: theme.color.lightGray,
  },
  alarmTitleSelected: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 24,
    color: theme.color.darkGray,
  },
  alarmButtonContainer: {
    width: 162,
    marginVertical: 10,
  },
  confirmButtonContainer: {
    position: 'absolute',
    left: 24,
    bottom: 40,
    width: 340,
  },
  confirmButtonTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 32,
    color: theme.color.lightGray,
  },
  completeButton: {
    backgroundColor: `${theme.color.white}`,
    borderRadius: 10,
  },
  completeButtonTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 32,
    color: theme.color.darkGray,
  },
  switch: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

const TagTextSelected = styled.Text`
  color: ${theme.color.white}
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  margin-right: 18px;
`;
const TagText = styled.Text`
  color: ${theme.color.white}
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  opacity: 0.3;
  margin-right: 18px;
`;
