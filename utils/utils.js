/**
 * 根据起始值生成响应的数组
 * @param {Number} start - 开始值
 * @param {Number} end - 结束值
 */
function newArray(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

/**
 * 生成 antd 的时间禁用支持函数
 * @param {String|Moment} data - 时间日期字符串
 * @param {String} type - 类型，可选 start, end
 */
export function disabledTime(data, type = 'start') {
  const DATE_FORMAT = 'YYYY-MM-DD';
  const timepoint = moment(data);
  const hour = timepoint.hour();
  const minute = timepoint.minute();
  const second = timepoint.second();

  console.log(hour, minute, second);
  return _data => {
    const _hour = _data && _data.hour();
    const _minute = _data && _data.minute();

    if (_data && _data.format(DATE_FORMAT) === timepoint.format(DATE_FORMAT)) {
      return {
        disabledHours() {
          if (type === 'end') {
            if (minute === 0 && second === 0) {
              return newArray(hour, 24);
            }
            return newArray(hour + 1, 24);
          } else {
            if (minute === 59 && second === 59) {
              return newArray(0, hour + 1);
            }
            return newArray(0, hour);
          }
        },
        disabledMinutes() {
          if (_hour === hour) {
            if (type === 'end') {
              if (second === 0) {
                return newArray(minute, 60);
              }
              return newArray(minute + 1, 60);
            } else {
              if (second === 59) {
                return newArray(0, minute + 1);
              }
              return newArray(0, minute);
            }
          } else {
            return [];
          }
        },
        disabledSeconds() {
          if (_hour === hour && _minute === minute) {
            if (type === 'end') {
              return newArray(second, 60);
            } else {
              return newArray(0, second + 1);
            }
          } else {
            return [];
          }
        },
      };
    }
  };
}
