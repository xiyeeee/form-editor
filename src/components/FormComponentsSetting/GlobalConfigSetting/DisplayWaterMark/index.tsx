import React from 'react';
import { Typography, Tooltip, Switch, Input } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updateGlobalFormConfig, updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface DisplayWaterMarkProps {
  form?: {
    displayWaterMark?: boolean;
    waterMarkText?: string;
  };
}

const DisplayWaterMark: React.FC<DisplayWaterMarkProps> = ({ form }) => {
  const dispatch = useDispatch();
  const globalFormConfig = useSelector((state: RootState) => state.form.globalFormConfig);
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const displayWaterMark = form?.displayWaterMark ?? globalFormConfig?.displayWaterMark ?? false;
  const waterMarkText = form?.waterMarkText || currentComponent?.waterMarkText || '';

  const changeValue = (value: boolean) => {
    dispatch(updateGlobalFormConfig({
      displayWaterMark: value
    }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(updateComponent({
      waterMarkText: value
    }));
  };

  return (
    <div>
      <div className={styles.settingItem}>
        <Text type="secondary" className={styles.secondary}>
          水印
          <Tooltip placement="top" title="可根据需求灵活使用水印，需要注意平衡品牌宣传，专业形象，版权所有权声明和用户体验">
            <QuestionCircleOutlined />
          </Tooltip>
        </Text>
        <Switch
          className={styles.switchR}
          checked={displayWaterMark}
          onChange={changeValue}
        />
      </div>

      {displayWaterMark && (
        <Input
          className={styles.mb10}
          placeholder="请输入水印（最多15个字）"
          value={waterMarkText}
          onChange={handleChangeInput}
          maxLength={15}
        />
      )}
    </div>
  );
};

export default DisplayWaterMark;