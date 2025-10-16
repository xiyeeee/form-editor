import React from 'react';
import { Typography, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface RangePlaceholderProps {
  comp?: {
    placeholderRange?: [string, string];
  };
}

const RangePlaceholder: React.FC<RangePlaceholderProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const placeholderRange = comp?.placeholderRange || currentComponent?.placeholderRange || ['', ''];

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: [string, string] = [e.target.value, placeholderRange[1] || ''];
    dispatch(updateComponent({
      placeholderRange: newValue
    }));
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: [string, string] = [placeholderRange[0] || '', e.target.value];
    dispatch(updateComponent({
      placeholderRange: newValue
    }));
  };

  return (
    <div className={styles.container}>
      <Text type="secondary" className={styles.title}>范围提示</Text>
      <div className={styles.inputGroup}>
        <Input
          className={styles.input}
          placeholder="开始提示"
          allowClear
          value={placeholderRange[0] || ''}
          onChange={handleStartChange}
        />
        <span className={styles.separator}>~</span>
        <Input
          className={styles.input}
          placeholder="结束提示"
          allowClear
          value={placeholderRange[1] || ''}
          onChange={handleEndChange}
        />
      </div>
    </div>
  );
};

export default RangePlaceholder;