import React from 'react';
import { Input } from 'antd';
import WXIcon from '../../../../assets/form/wx.svg';
import styles from './index.module.less';

interface WXProps {
  id: string;
  placeholder: string;
  value: string;
  isDev: boolean;
  onChange?: (value: string) => void;
}

const WX: React.FC<WXProps> = ({ 
  placeholder, 
  value, 
  isDev, 
  onChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <Input
      value={value}
      placeholder={placeholder}
      disabled={isDev}
      onChange={handleChange}
      prefix={<img src={WXIcon} alt="WeChat" className={styles.icon} />}
    />
  );
};

export default WX;