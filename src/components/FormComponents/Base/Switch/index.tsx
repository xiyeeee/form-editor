import React from 'react';
import { Switch } from 'antd';
import styles from './index.module.less';

interface SwitchComponentProps {
  id?: string;
  placeholder?: string;
  value?: boolean;
  isDev?: boolean;
  dataList?: any[];
  onChange?: (checked: boolean) => void;
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({
  id,
  placeholder = '开关',
  value = false,
  isDev = false,
  dataList = [],
  onChange
}) => {
  const handleChange = (checked: boolean) => {
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <Switch
      disabled={isDev}
      title={isDev ? '开发模式下禁用' : placeholder}
      checked={value}
      onChange={handleChange}
      className={styles.switch}
    />
  );
};

export default SwitchComponent;