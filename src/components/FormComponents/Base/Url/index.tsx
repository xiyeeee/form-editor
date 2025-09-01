import React from 'react';
import { Input } from 'antd';
import { IeOutlined } from '@ant-design/icons';
import styles from './index.module.less';

interface UrlComponentProps {
  id?: string;
  placeholder?: string;
  value?: string;
  isDev?: boolean;
  onChange?: (value: string) => void;
}

const UrlComponent: React.FC<UrlComponentProps> = ({
  id,
  placeholder = '请输入URL地址',
  value,
  isDev = false,
  onChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Input
      disabled={isDev}
      title={isDev ? '开发模式下禁用' : placeholder}
      value={value}
      placeholder={placeholder}
      prefix={<IeOutlined />}
      onChange={handleChange}
      className={styles.urlInput}
    />
  );
};

export default UrlComponent;