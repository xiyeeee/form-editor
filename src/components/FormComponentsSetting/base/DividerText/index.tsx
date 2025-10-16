import React from 'react';
import { Typography, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface DividerTextProps {
  comp?: {
    dividerValue?: string;
  };
}

const DividerText: React.FC<DividerTextProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const dividerValue = comp?.dividerValue || currentComponent?.dividerValue || '';

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateComponent({
      dividerValue: e.target.value
    }));
  };

  return (
    <div>
      <Text type="secondary" className={styles.blockTitle}>分割线文本</Text>
      <Input
        className={styles.input}
        placeholder="输入分割线文本"
        allowClear
        value={dividerValue}
        onChange={handleChangeInput}
        maxLength={30}
        showCount
      />
    </div>
  );
};

export default DividerText;