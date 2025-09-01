import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import styles from './index.module.less';

interface DateComponentProps {
  placeholder?: string;
  value?: string;
  isDev?: boolean;
  onChange?: (value: string) => void;
}

const DateComponent: React.FC<DateComponentProps> = ({
  placeholder = '请选择日期',
  value,
  isDev = false,
  onChange
}) => {
  const handleChange = (_date: any, dateString: string | string[]) => {
    if (onChange && typeof dateString === 'string') {
      onChange(dateString);
    }
  };

  return (
    <DatePicker
      disabled={isDev}
      title={isDev ? '开发模式下禁用' : placeholder}
      className={styles.datePicker}
      placeholder={placeholder}
      value={value ? moment(value) : null}
      onChange={handleChange}
    />
  );
};

export default DateComponent;