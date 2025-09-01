import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import styles from './index.module.less';

const { RangePicker } = DatePicker;

interface DateRangeComponentProps {
  placeholderRange?: [string, string];
  value?: [string, string];
  isDev?: boolean;
  onChange?: (dates: [string, string]) => void;
}

const DateRangeComponent: React.FC<DateRangeComponentProps> = ({
  placeholderRange = ['开始日期', '结束日期'],
  value,
  isDev = false,
  onChange
}) => {
  const handleChange = (_dates: any, dateStrings: [string, string]) => {
    if (onChange) {
      onChange(dateStrings);
    }
  };

  return (
    <RangePicker
      disabled={isDev}
      title={isDev ? '开发模式下禁用' : ''}
      className={styles.dateRangePicker}
      placeholder={placeholderRange}
      value={value ? [dayjs(value[0]), dayjs(value[1])] : null}
      onChange={handleChange}
    />
  );
};

export default DateRangeComponent;