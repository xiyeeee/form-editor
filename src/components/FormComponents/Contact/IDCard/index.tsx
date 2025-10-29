import React from 'react';
import { Input } from 'antd';
import IDIcon from '../../../../assets/form/id.svg';
import styles from './index.module.less';

interface IDCardProps {
  id: string;
  placeholder: string;
  value: string;
  isDev: boolean;
  isPreviewRender?: boolean;
  onChange?: (value: string) => void;
}

const IDCard: React.FC<IDCardProps> = ({
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
      prefix={<img src={IDIcon} alt="ID" className={styles.icon} />}
    />
  );
};

export default IDCard;
