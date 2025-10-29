import React from 'react';
import { Input } from 'antd';
import { IeOutlined } from '@ant-design/icons';
import styles from './index.module.less';

interface UrlComponentProps {
  id?: string;
  placeholder?: string;
  value?: string;
  isDev?: boolean;
  isPreviewRender?: boolean;
  onChange?: (value: string) => void;
}

const UrlComponent: React.FC<UrlComponentProps> = ({
  id,
  placeholder = '请输入URL地址',
  value,
  isDev = false,
  isPreviewRender = false,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPreviewRender && onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Input
      disabled={isDev || isPreviewRender}
      title={isDev ? '开发模式下禁用' : isPreviewRender ? '预览模式下禁用' : placeholder}
      value={value}
      placeholder={placeholder}
      prefix={<IeOutlined />}
      onChange={handleChange}
      className={styles.urlInput}
    />
  );
};

export default UrlComponent;
