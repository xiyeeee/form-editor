import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './index.module.less';

interface UploadComponentProps {
  id?: string;
  placeholder?: string;
  value?: string;
  isDev?: boolean;
  isPreviewRender?: boolean;
  fileList?: any[];
  onChange?: (fileList: any[]) => void;
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  id,
  placeholder = '点击上传',
  value,
  isDev = false,
  isPreviewRender = false,
  fileList = [],
  onChange,
}) => {
  const handleChange = (info: any) => {
    if (!isPreviewRender && onChange) {
      onChange(info.fileList);
    }
  };

  return (
    <Upload
      disabled={isDev || isPreviewRender}
      fileList={fileList}
      name="file"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={handleChange}
      className={styles.upload}
    >
      <Button icon={<UploadOutlined />} disabled={isDev || isPreviewRender}>
        {placeholder}
      </Button>
    </Upload>
  );
};

export default UploadComponent;
