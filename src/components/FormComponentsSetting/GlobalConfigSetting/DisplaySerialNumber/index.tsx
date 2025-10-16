import React from 'react';
import { Typography, Tooltip, Switch } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updateGlobalFormConfig } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface DisplaySerialNumberProps {
  form?: {
    displayNumberSort?: boolean;
  };
}

const DisplaySerialNumber: React.FC<DisplaySerialNumberProps> = ({ form }) => {
  const dispatch = useDispatch();
  const globalFormConfig = useSelector((state: RootState) => state.form.globalFormConfig);

  const displayNumberSort = form?.displayNumberSort ?? globalFormConfig?.displayNumberSort ?? true;

  const changeValue = (value: boolean) => {
    dispatch(updateGlobalFormConfig({
      displayNumberSort: value
    }));
  };

  return (
    <div className={styles.settingItem}>
      <Text type="secondary" className={styles.secondary}>
        组件序号
        <Tooltip placement="top" title="批量操作：编号的显示隐藏">
          <QuestionCircleOutlined />
        </Tooltip>
      </Text>
      <Switch
        className={styles.switchR}
        checked={displayNumberSort}
        onChange={changeValue}
      />
    </div>
  );
};

export default DisplaySerialNumber;