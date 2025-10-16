import React from 'react';
import { Typography, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;
const { TextArea } = Input;

interface TitleProps {
  comp?: {
    title?: string;
  };
}

const Title: React.FC<TitleProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const handleChangeInput = (value: string) => {
    dispatch(updateComponent({
      title: value
    }));
  };

  const titleValue = comp?.title || currentComponent?.title || '';

  return (
    <div>
      <Text type="secondary" className={styles.blockTitle}>标题</Text>
      <TextArea
        className={styles.mb10}
        placeholder="请输入标题"
        allowClear
        showCount
        value={titleValue}
        onChange={(e) => handleChangeInput(e.target.value)}
        autoSize={{ minRows: 2, maxRows: 5 }}
        maxLength={50}
      />
    </div>
  );
};

export default Title;