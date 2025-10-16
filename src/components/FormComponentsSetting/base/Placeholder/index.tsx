import React from 'react';
import { Typography, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface PlaceholderProps {
  comp?: {
    placeholder?: string;
  };
}

const Placeholder: React.FC<PlaceholderProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(updateComponent({
      placeholder: value
    }));
  };

  const placeholderValue = comp?.placeholder || currentComponent?.placeholder || '';

  return (
    <div>
      <Text type="secondary" className={styles.blockTitle}>输入框提示</Text>
      <Input
        placeholder="输入框提示"
        allowClear
        value={placeholderValue}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default Placeholder;