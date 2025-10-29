import React, { useCallback } from 'react';
import { Divider, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.less';

interface Props {
  isDev: boolean;
  isPreviewRender?: boolean;
  pagingValue: string;
  pageSubTitle: string;
  pageSubDescription: string;
  onSubDataChange?: (data: { pageSubTitle?: string; pageSubDescription?: string }) => void;
}

const Paging: React.FC<Props> = ({
  isDev,
  isPreviewRender = false,
  pagingValue,
  pageSubTitle,
  pageSubDescription,
  onSubDataChange,
}) => {
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (!isPreviewRender && onSubDataChange) {
        onSubDataChange({ pageSubTitle: value });
      }
    },
    [isPreviewRender, onSubDataChange]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (!isPreviewRender && onSubDataChange) {
        onSubDataChange({ pageSubDescription: value });
      }
    },
    [isPreviewRender, onSubDataChange]
  );

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
          disabled={!isDev || isPreviewRender}
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
          disabled={!isDev || isPreviewRender}
        />
      )}
    </div>
  );
};

export default Paging;
