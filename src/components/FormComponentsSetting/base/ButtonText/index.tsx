import React from 'react';
import { Typography, Input, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface ButtonTextProps {
  comp?: {
    buttonText?: string;
    buttonIconShowBool?: boolean;
  };
}

const ButtonText: React.FC<ButtonTextProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const buttonText = comp?.buttonText || currentComponent?.buttonText || '';
  const buttonIconShowBool = comp?.buttonIconShowBool ?? currentComponent?.buttonIconShowBool ?? false;

  const handleButtonTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateComponent({
      buttonText: e.target.value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    dispatch(updateComponent({
      buttonIconShowBool: checked
    }));
  };

  return (
    <div>
      <Text type="secondary" className={styles.blockTitle}>按钮文字</Text>
      <Input
        className={styles.mb10}
        placeholder="请输入按钮文字（最多30个字）"
        value={buttonText}
        onChange={handleButtonTextChange}
        maxLength={30}
      />

      <div className={styles.settingItem}>
        <Text type="secondary">显示图标</Text>
        <Switch
          className={styles.switchR}
          checked={buttonIconShowBool}
          onChange={handleSwitchChange}
        />
      </div>
    </div>
  );
};

export default ButtonText;