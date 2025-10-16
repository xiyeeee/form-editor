import React from 'react';
import { Typography, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;
const { Option } = Select;

// 模拟选项数据，需要根据实际项目调整
const orientationList = [
  { name: '左对齐', value: 'left' },
  { name: '居中', value: 'center' },
  { name: '右对齐', value: 'right' },
];

interface SizeProps {
  comp?: {
    position?: string;
    size?: string;
  };
}

const Size: React.FC<SizeProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const handleChangePosition = (value: any) => {
    dispatch(
      updateComponent({
        position: value,
      })
    );
  };

  const positionValue = comp?.position || currentComponent?.position || 'left';

  return (
    <div className={`${styles.settingItem} ${styles.h50}`}>
      <Text type="secondary" className={styles.blockTitle2}>
        位置
      </Text>
      <Select
        value={positionValue}
        style={{ width: 120 }}
        className={styles.absR}
        onChange={handleChangePosition}
      >
        {orientationList.map(item => (
          <Option key={item.value} value={item.value}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Size;
