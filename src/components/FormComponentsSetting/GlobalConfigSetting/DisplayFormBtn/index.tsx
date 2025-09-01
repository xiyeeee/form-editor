import React from 'react';
import { Typography, Tooltip, Switch, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updateGlobalFormConfig } from '@/store/formSlice';
import classNames from 'classnames';
import styles from './index.module.less';
const { Text } = Typography;

interface DisplayFormBtnProps {
  form: {
    displayFormBtn: boolean;
  };
}

const DisplayFormBtn: React.FC<DisplayFormBtnProps> = ({ form }) => {
  const dispatch = useDispatch();

  const changeValue = (value: boolean) => {
    dispatch(
      updateGlobalFormConfig({
        displayFormBtn: value,
      })
    );
  };

  return (
    <div className={classNames(styles.settingItem, styles.h42)}>
      <Text type="secondary" className="secondary">
        表单按钮
        <Tooltip placement="top" title="是否启动表单按钮">
          <QuestionCircleOutlined />
        </Tooltip>
      </Text>
      <Space direction="vertical" className="abs-r switch-r">
        <Switch checked={form.displayFormBtn} onChange={changeValue} />
      </Space>
    </div>
  );
};

export default DisplayFormBtn;
