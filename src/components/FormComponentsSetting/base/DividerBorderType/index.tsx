import React from 'react';
import { Typography, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateGlobalFormConfig } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface DividerBorderTypeProps {
  comp?: {
    dividerBorderType?: boolean;
  };
}

const DividerBorderType: React.FC<DividerBorderTypeProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const globalFormConfig = useSelector((state: RootState) => state.form.globalFormConfig);

  const dividerBorderType = comp?.dividerBorderType ?? globalFormConfig?.dividerBorderType ?? false;

  const handleChange = (checked: boolean) => {
    dispatch(updateGlobalFormConfig({
      dividerBorderType: checked
    }));
  };

  return (
    <div className={styles.settingItem}>
      <Text type="secondary">虚线</Text>
      <Switch
        className={styles.switchR}
        checked={dividerBorderType}
        onChange={handleChange}
      />
    </div>
  );
};

export default DividerBorderType;