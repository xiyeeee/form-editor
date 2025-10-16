import React from 'react';
import { Typography, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;
const { Group: RadioGroup, Button: RadioButton } = Radio;

interface LayoutTypeProps {
  comp?: {
    layoutType?: 'horizontal' | 'vertical';
  };
}

const LayoutType: React.FC<LayoutTypeProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const layoutType = comp?.layoutType || currentComponent?.layoutType || 'horizontal';

  const layoutTypeList = [
    {
      label: '横向',
      value: 'horizontal'
    },
    {
      label: '纵向',
      value: 'vertical'
    }
  ];

  const handleChangeInput = (e: any) => {
    const value = e.target.value;
    dispatch(updateComponent({
      layoutType: value
    }));
  };

  return (
    <div className={styles.settingItem}>
      <Text type="secondary" className={styles.secondary}>布局方式</Text>
      <div className={styles.absR}>
        <RadioGroup
          value={layoutType}
          onChange={handleChangeInput}
        >
          {layoutTypeList.map((item) => (
            <RadioButton key={item.value} value={item.value}>
              {item.label}
            </RadioButton>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default LayoutType;