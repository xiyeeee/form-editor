import React, { useState, useCallback } from 'react';
import { Divider, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.less';

interface Props {
  isDev: boolean;
  pagingValue: string;
  pageSubTitle: string;
  pageSubDescription: string;
  onDataChange?: (data: { pageSubTitle?: string; pageSubDescription?: string }) => void;
}

const Paging: React.FC<Props> = ({
  isDev,
  pagingValue,
  pageSubTitle,
  pageSubDescription,
  onDataChange,
}) => {
  const [localTitle, setLocalTitle] = useState(pageSubTitle);
  const [localDescription, setLocalDescription] = useState(pageSubDescription);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalTitle(value);
    if (onDataChange) {
      onDataChange({ pageSubTitle: value });
    }
  }, [onDataChange]);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLocalDescription(value);
    if (onDataChange) {
      onDataChange({ pageSubDescription: value });
    }
  }, [onDataChange]);

  return (
    <div className={styles.pagingContainer}>
      <Divider className={styles.paging}>
        <span className={styles.pageNumber}>{pagingValue}</span>
      </Divider>
      
      {(isDev || pageSubTitle) && (
        <Input
          className={styles.pageTitle}
          value={localTitle}
          onChange={handleTitleChange}
          placeholder="请输入分页标题"
          variant="borderless"
          disabled={!isDev}
        />
      )}
      
      {(isDev || pageSubDescription) && (
        <Input.TextArea
          className={styles.pageSubDescription}
          value={localDescription}
          onChange={handleDescriptionChange}
          placeholder="请输入分页描述"
          variant="borderless"
          autoSize={{ minRows: 2, maxRows: 4 }}
          disabled={!isDev}
        />
      )}
    </div>
  );
};

export default Paging;