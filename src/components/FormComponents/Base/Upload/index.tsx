import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './index.module.less';

interface UploadComponentProps {
  id?: string;
  placeholder?: string;
  value?: string;
  isDev?: boolean;
  fileList?: any[];
  onChange?: (fileList: any[]) => void;
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  id,
  placeholder = '点击上传',
  value,
  isDev = false,
  fileList = [],
  onChange,
}) => {
  const handleChange = (info: any) => {
    if (onChange) {
      onChange(info.fileList);
    }
  };

  return (
    <Upload
      disabled={isDev}
      fileList={fileList}
      name="file"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={handleChange}
      className={styles.upload}
    >
      <Button icon={<UploadOutlined />}>{placeholder}</Button>
    </Upload>
  );
};

export default UploadComponent;
