import React from 'react';
import { Input } from 'antd';
import TelePhoneIcon from '../../../../assets/form/telePhone.svg';
import styles from './index.module.less';

interface TelePhoneProps {
  id: string;
  placeholder: string;
  value: string | null;
  isDev: boolean;
  onChange?: (value: string) => void;
}

const TelePhone: React.FC<TelePhoneProps> = ({ 
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
      value={value || ''}
      placeholder={placeholder}
      disabled={isDev}
      onChange={handleChange}
      prefix={<img src={TelePhoneIcon} alt="Telephone" className={styles.icon} />}
    />
  );
};

export default TelePhone;