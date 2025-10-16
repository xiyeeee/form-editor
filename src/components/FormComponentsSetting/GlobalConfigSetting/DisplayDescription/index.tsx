import React from 'react';
import { Typography, Tooltip, Switch } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updateGlobalFormConfig } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface DisplayDescriptionProps {
  form?: {
    displayDescription?: boolean;
  };
}

const DisplayDescription: React.FC<DisplayDescriptionProps> = ({ form }) => {
  const dispatch = useDispatch();
  const globalFormConfig = useSelector((state: RootState) => state.form.globalFormConfig);

  const displayDescription = form?.displayDescription ?? globalFormConfig?.displayDescription ?? true;

  const changeValue = (value: boolean) => {
    dispatch(updateGlobalFormConfig({
      displayDescription: value
    }));
  };

  return (
    <div className={styles.settingItem}>
      <Text type="secondary" className={styles.secondary}>
        组件描述
        <Tooltip placement="top" title="批量操作：针对有值的描述字段显示隐藏操作，没有赋值预览页面会自动隐藏">
          <QuestionCircleOutlined />
        </Tooltip>
      </Text>
      <Switch
        className={styles.switchR}
        checked={displayDescription}
        onChange={changeValue}
      />
    </div>
  );
};

export default DisplayDescription;