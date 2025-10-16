import React from 'react';
import { Typography, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;
const { Option } = Select;

interface PositionProps {
  comp?: {
    position?: 'left' | 'right' | 'center';
  };
}

const Position: React.FC<PositionProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const orientationList = [
    { name: '左对齐', value: 'left' },
    { name: '居中', value: 'center' },
    { name: '右对齐', value: 'right' },
  ];

  const handleChangePosition = (value: 'left' | 'right' | 'center') => {
    dispatch(updateComponent({
      position: value
    }));
  };

  const positionValue = comp?.position || currentComponent?.position || 'center';

  return (
    <div className={styles.settingItem}>
      <Text type="secondary" className={styles.blockTitle}>位置</Text>
      <Select
        value={positionValue}
        style={{ width: 120 }}
        className={styles.absR}
        onChange={handleChangePosition}
      >
        {orientationList.map((item) => (
          <Option key={item.value} value={item.value}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Position;