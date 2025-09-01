import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import styles from './index.module.less';

interface TimeRangeComponentProps {
  id?: string;
  placeholderRange?: [string, string];
  value?: [string, string];
  isDev?: boolean;
  onChange?: (times: [string, string]) => void;
}

const TimeRangeComponent: React.FC<TimeRangeComponentProps> = ({
  id,
  placeholderRange = ['开始时间', '结束时间'],
  value,
  isDev = false,
  onChange
}) => {
  const handleChange = (times: any, timeStrings: [string, string]) => {
    if (onChange) {
      onChange(timeStrings);
    }
  };

  return (
    <TimePicker.RangePicker
      disabled={isDev}
      title={isDev ? '开发模式下禁用' : ''}
      className={styles.timeRangePicker}
      placeholder={placeholderRange}
      value={value ? [dayjs(value[0], 'HH:mm:ss'), dayjs(value[1], 'HH:mm:ss')] : null}
      onChange={handleChange}
    />
  );
};

export default TimeRangeComponent;