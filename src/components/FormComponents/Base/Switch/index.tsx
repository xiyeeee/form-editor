import React from 'react';
import { Switch } from 'antd';
import styles from './index.module.less';

interface SwitchComponentProps {
  id?: string;
  placeholder?: string;
  value?: boolean;
  isDev?: boolean;
  isPreviewRender?: boolean;
  dataList?: any[];
  onChange?: (checked: boolean) => void;
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({
  id,
  placeholder = '开关',
  value = false,
  isDev = false,
  isPreviewRender = false,
  dataList = [],
  onChange,
}) => {
  const handleChange = (checked: boolean) => {
    if (!isPreviewRender && onChange) {
      onChange(checked);
    }
  };

  return (
    <Switch
      disabled={isDev || isPreviewRender}
      title={isDev ? '开发模式下禁用' : isPreviewRender ? '预览模式下禁用' : placeholder}
      checked={value}
      onChange={handleChange}
      className={styles.switch}
    />
  );
};

export default SwitchComponent;
