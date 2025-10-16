import React from 'react';
import { Typography, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface NumberConfigProps {
  comp?: {
    minValue?: number;
    maxValue?: number;
  };
}

const NumberConfig: React.FC<NumberConfigProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const minValue = comp?.minValue ?? currentComponent?.minValue;
  const maxValue = comp?.maxValue ?? currentComponent?.maxValue;

  const handleChangeMin = (value: number | null) => {
    dispatch(updateComponent({
      minValue: value || undefined
    }));
  };

  const handleChangeMax = (value: number | null) => {
    dispatch(updateComponent({
      maxValue: value || undefined
    }));
  };

  return (
    <div>
      <div className={styles.settingItem}>
        <Text type="secondary" className={styles.secondary}>最小值</Text>
        <Input
          type="number"
          className={styles.absR}
          value={minValue}
          placeholder="最小值"
          allowClear
          onChange={(e) => handleChangeMin(e.target.value ? Number(e.target.value) : null)}
        />
      </div>

      <div className={styles.settingItem}>
        <Text type="secondary" className={styles.secondary}>最大值</Text>
        <Input
          type="number"
          className={styles.absR}
          value={maxValue}
          placeholder="最大值"
          allowClear
          onChange={(e) => handleChangeMax(e.target.value ? Number(e.target.value) : null)}
        />
      </div>
    </div>
  );
};

export default NumberConfig;