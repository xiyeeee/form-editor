import React from 'react';
import { Typography, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;
const { TextArea } = Input;

interface DescriptionProps {
  comp?: {
    description?: string;
  };
}

const Description: React.FC<DescriptionProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const handleChangeInput = (value: string) => {
    dispatch(updateComponent({
      description: value
    }));
  };

  const descriptionValue = comp?.description || currentComponent?.description || '';

  return (
    <div>
      <Text type="secondary" className={styles.blockTitle}>描述/备注</Text>
      <TextArea
        className={styles.mb10}
        placeholder="请输入描述"
        allowClear
        showCount
        value={descriptionValue}
        onChange={(e) => handleChangeInput(e.target.value)}
        autoSize={{ minRows: 2, maxRows: 5 }}
        maxLength={200}
      />
    </div>
  );
};

export default Description;