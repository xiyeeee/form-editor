import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import styles from './index.module.less';

interface TimeComponentProps {
  isDev?: boolean;
  isPreviewRender?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TimeComponent: React.FC<TimeComponentProps> = ({
  isDev = false,
  isPreviewRender = false,
  placeholder = '请选择时间',
  value,
  onChange,
}) => {
  const handleChange = (_time: any, timeString: string | string[]) => {
    if (!isPreviewRender && onChange && typeof timeString === 'string') {
      onChange(timeString);
    }
  };

  return (
    <TimePicker
      disabled={isDev || isPreviewRender}
      title={isDev ? '开发模式下禁用' : isPreviewRender ? '预览模式下禁用' : placeholder}
      className={styles.timePicker}
      placeholder={placeholder}
      value={value ? dayjs(value, 'HH:mm:ss') : null}
      onChange={handleChange}
    />
  );
};

export default TimeComponent;
