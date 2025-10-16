import React from 'react';
import { Typography, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface ValidationCustomProps {
  comp?: {
    isRequired?: boolean;
    isCustomErrorMessage?: boolean;
  };
}

const ValidationCustom: React.FC<ValidationCustomProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const isCustomErrorMessage = comp?.isCustomErrorMessage ?? currentComponent?.isCustomErrorMessage ?? false;

  const handleChangeInput = (checked: boolean) => {
    dispatch(updateComponent({
      isCustomErrorMessage: checked
    }));
  };

  return (
    <div className={styles.settingItem}>
      <Text type="secondary" className={styles.secondary}>自定义错误提示</Text>
      <Switch
        className={styles.switchR}
        checked={isCustomErrorMessage}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default ValidationCustom;