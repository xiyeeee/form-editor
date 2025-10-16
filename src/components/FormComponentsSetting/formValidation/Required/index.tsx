import React from 'react';
import { Typography, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface RequiredProps {
  comp?: {
    isRequired?: boolean;
  };
}

const Required: React.FC<RequiredProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const isRequired = comp?.isRequired ?? currentComponent?.isRequired ?? false;

  const handleChangeInput = (checked: boolean) => {
    dispatch(updateComponent({
      isRequired: checked
    }));
  };

  return (
    <div className={styles.settingItem}>
      <Text type="secondary" className={styles.secondary}>必填</Text>
      <Switch
        className={styles.switchR}
        checked={isRequired}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default Required;