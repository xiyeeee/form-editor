import React from 'react';
import { Typography, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;
const { TextArea } = Input;

interface PageSubDescriptionProps {
  comp?: {
    pageSubDescription?: string;
  };
}

const PageSubDescription: React.FC<PageSubDescriptionProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const pageSubDescription = comp?.pageSubDescription || currentComponent?.pageSubDescription || '';

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateComponent({
      pageSubDescription: e.target.value
    }));
  };

  return (
    <div>
      <Text type="secondary" className={styles.blockTitle}>分页描述</Text>
      <TextArea
        placeholder="请输入分页描述"
        allowClear
        showCount
        value={pageSubDescription}
        onChange={handleChangeInput}
        autoSize={{ minRows: 2, maxRows: 5 }}
        maxLength={200}
      />
    </div>
  );
};

export default PageSubDescription;