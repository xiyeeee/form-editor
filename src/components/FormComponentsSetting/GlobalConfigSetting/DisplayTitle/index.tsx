import React from 'react';
import { Typography, Tooltip, Switch } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updateGlobalFormConfig } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface DisplayTitleProps {
  form?: {
    displayTitle?: boolean;
  };
}

const DisplayTitle: React.FC<DisplayTitleProps> = ({ form }) => {
  const dispatch = useDispatch();
  const globalFormConfig = useSelector((state: RootState) => state.form.globalFormConfig);

  const displayTitle = form?.displayTitle ?? globalFormConfig?.displayTitle ?? true;

  const changeValue = (value: boolean) => {
    dispatch(updateGlobalFormConfig({
      displayTitle: value
    }));
  };

  return (
    <div className={styles.settingItem}>
      <Text type="secondary" className={styles.secondary}>
        组件标题
        <Tooltip placement="top" title="批量操作：标题的显示隐藏">
          <QuestionCircleOutlined />
        </Tooltip>
      </Text>
      <Switch
        className={styles.switchR}
        checked={displayTitle}
        onChange={changeValue}
      />
    </div>
  );
};

export default DisplayTitle;