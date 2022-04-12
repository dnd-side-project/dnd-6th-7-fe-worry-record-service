import React, { FC } from 'react';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components/native';

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

const InlineDatePicker: FC<DatePickerProps> = ({ date, onDateChange }) => {
  return (
    <DatePickerWrapper>
      <DatePicker
        mode="date"
        textColor="#fff"
        fadeToColor="#fff"
        date={date}
        onDateChange={onDateChange}
      />
    </DatePickerWrapper>
  );
};

export default InlineDatePicker;

const DatePickerWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;
