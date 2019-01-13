import React from 'react';
import { DatePicker as DateTimePicker } from 'antd';
import moment from 'moment';
import { disabledTime } from 'utils/utils';

export default class DateTimePicker extends React.Component {
  render() {
    const { disabledDateTime, disabledType = 'start' } = this.props;
    const momentDateTime = moment(disabledDateTime);
    const defaultValue = disabledType === 'end' ? momentDateTime.subtract(1, 'seconds') : momentDateTime.add(1, 'seconds');
    console.log(momentDateTime, defaultValue);
    const disabledDate = (currentDate) => {
      if (disabledType === 'end') {
        return defaultValue.isBefore(currentDate, 'day');
      }
      return defaultValue.isAfter(currentDate, 'day');
    }

    return (
      <DateTimePicker
        showTime={{
          defaultValue,
        }}
        format="YYYY-MM-DD HH:mm:ss"
        disabledTime={disabledTime(momentDateTime, disabledType)}
        disabledDate={disabledDate}
      />
    )
  }
}
