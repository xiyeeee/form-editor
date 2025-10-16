import React from 'react';
import { Typography, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;
const { TextArea } = Input;

interface PageSubTitleProps {
  comp?: {
    pageSubTitle?: string;
  };
}

const PageSubTitle: React.FC<PageSubTitleProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const pageSubTitle = comp?.pageSubTitle || currentComponent?.pageSubTitle || '';

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateComponent({
      pageSubTitle: e.target.value
    }));
  };

  return (
    <div>
      <Text type="secondary" className={styles.blockTitle}>分页标题</Text>
      <TextArea
        placeholder="请输入分页标题"
        allowClear
        showCount
        value={pageSubTitle}
        onChange={handleChangeInput}
        autoSize={{ minRows: 2, maxRows: 5 }}
        maxLength={50}
      />
    </div>
  );
};

export default PageSubTitle;