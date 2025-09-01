import React from 'react';
import { Pagination } from 'antd';
import styles from './index.module.less';

interface PagingComponentProps {
  isDev?: boolean;
  pagingValue?: string;
  pageSubTitle?: string;
  pageSubDescription?: string;
  onPageSubTitleChange?: (value: string) => void;
  onPageSubDescriptionChange?: (value: string) => void;
}

const PagingComponent: React.FC<PagingComponentProps> = ({
  isDev = false,
  pagingValue = '1',
  pageSubTitle = '',
  pageSubDescription = '',
  onPageSubTitleChange,
  onPageSubDescriptionChange
}) => {
  const handleSubTitleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const value = e.currentTarget.textContent || '';
    if (onPageSubTitleChange) {
      onPageSubTitleChange(value);
    }
  };

  const handleSubDescriptionBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const value = e.currentTarget.textContent || '';
    if (onPageSubDescriptionChange) {
      onPageSubDescriptionChange(value);
    }
  };

  return (
    <div>
      <div className={styles.paging}>
        <span className={styles.pageNumber}>{pagingValue}</span>
      </div>
      {(isDev || pageSubTitle) && (
        <div
          className={styles.pageTitle}
          contentEditable={isDev}
          suppressContentEditableWarning
          onBlur={handleSubTitleBlur}
        >
          {pageSubTitle}
        </div>
      )}
      {(isDev || pageSubDescription) && (
        <div
          className={styles.pageSubDescription}
          contentEditable={isDev}
          suppressContentEditableWarning
          onBlur={handleSubDescriptionBlur}
        >
          {pageSubDescription}
        </div>
      )}
    </div>
  );
};

export default PagingComponent;