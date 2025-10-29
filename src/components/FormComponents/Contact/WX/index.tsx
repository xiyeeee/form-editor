import React from 'react';
import { Input } from 'antd';
import WXIcon from '../../../../assets/form/wx.svg';
import styles from './index.module.less';

interface WXProps {
  id: string;
  placeholder: string;
  value: string;
  isDev: boolean;
  isPreviewRender?: boolean;
  onChange?: (value: string) => void;
}

const WX: React.FC<WXProps> = ({
  placeholder,
  value,
  isDev,
  isPreviewRender = false,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPreviewRender) {
      onChange?.(e.target.value);
    }
  };

  return (
    <Input
      value={value}
      placeholder={placeholder}
      disabled={isDev || isPreviewRender}
      onChange={handleChange}
      prefix={<img src={WXIcon} alt="WeChat" className={styles.icon} />}
    />
  );
};

export default WX;
