import React, { useCallback } from 'react';
import { Divider, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.less';

interface Props {
  isDev: boolean;
  pagingValue: string;
  pageSubTitle: string;
  pageSubDescription: string;
  onSubDataChange?: (data: { pageSubTitle?: string; pageSubDescription?: string }) => void;
}

const Paging: React.FC<Props> = ({
  isDev,
  pagingValue,
  pageSubTitle,
  pageSubDescription,
  onSubDataChange,
}) => {
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onSubDataChange) {
      onSubDataChange({ pageSubTitle: value });
    }
  }, [onSubDataChange]);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (onSubDataChange) {
      onSubDataChange({ pageSubDescription: value });
    }
  }, [onSubDataChange]);

  return (
    <div className={styles.pagingContainer}>
      <Divider className={styles.paging}>
        <span className={styles.pageNumber}>{pagingValue}</span>
      </Divider>
      
      {(isDev || pageSubTitle) && (
        <Input
          className={styles.pageTitle}
          value={pageSubTitle || ''}
          onChange={handleTitleChange}
          placeholder="请输入分页标题"
          variant="borderless"
          disabled={!isDev}
        />
      )}

      {(isDev || pageSubDescription) && (
        <Input.TextArea
          className={styles.pageSubDescription}
          value={pageSubDescription || ''}
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