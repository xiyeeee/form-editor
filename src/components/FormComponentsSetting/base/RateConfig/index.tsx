import React from 'react';
import { Typography, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;
const { Option } = Select;

interface RateConfigProps {
  comp?: {
    rateCount?: number;
    rateColor?: string;
    rateAllowHalf?: boolean;
  };
}

const RateConfig: React.FC<RateConfigProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const rateCount = comp?.rateCount ?? currentComponent?.rateCount ?? 5;
  const rateColor = comp?.rateColor || currentComponent?.rateColor || '#faad14';
  const rateAllowHalf = comp?.rateAllowHalf ?? currentComponent?.rateAllowHalf ?? false;

  const rateCountOptions = [3, 4, 5, 6, 7, 8, 9, 10];
  const rateColorOptions = [
    { label: '黄色', value: '#faad14' },
    { label: '红色', value: '#f5222d' },
    { label: '绿色', value: '#52c41a' },
    { label: '蓝色', value: '#1890ff' },
  ];

  const handleRateCountChange = (value: number) => {
    dispatch(updateComponent({
      rateCount: value
    }));
  };

  const handleRateColorChange = (value: string) => {
    dispatch(updateComponent({
      rateColor: value
    }));
  };

  const handleRateAllowHalfChange = (checked: boolean) => {
    dispatch(updateComponent({
      rateAllowHalf: checked
    }));
  };

  return (
    <div>
      <div className={styles.settingItem}>
        <Text type="secondary" className={styles.blockTitle2}>评分数量</Text>
        <Select
          value={rateCount}
          style={{ width: 120 }}
          className={styles.absR}
          onChange={handleRateCountChange}
        >
          {rateCountOptions.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>

      <div className={styles.settingItem}>
        <Text type="secondary" className={styles.blockTitle2}>评分颜色</Text>
        <Select
          value={rateColor}
          style={{ width: 120 }}
          className={styles.absR}
          onChange={handleRateColorChange}
        >
          {rateColorOptions.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default RateConfig;