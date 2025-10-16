import React from 'react';
import { Typography, Input, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface UseOtherDataListProps {
  comp?: {
    useOtherDataList?: boolean;
    dataOtherList?: Array<{
      label: string;
      value: string;
    }>;
  };
}

const UseOtherDataList: React.FC<UseOtherDataListProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const useOtherDataList = comp?.useOtherDataList ?? currentComponent?.useOtherDataList ?? false;
  const dataOtherList = comp?.dataOtherList || currentComponent?.dataOtherList || [{ label: '', value: '' }];
  const otherText = dataOtherList[0]?.label || '';

  const handleChangeSwitch = (checked: boolean) => {
    dispatch(updateComponent({
      useOtherDataList: checked
    }));
  };

  const handleChangeOther = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(updateComponent({
      dataOtherList: [{
        label: value,
        value: value,
      }]
    }));
  };

  return (
    <div>
      <div className={styles.settingItem}>
        <Text type="secondary" className={styles.secondary}>显示其他数据</Text>
        <Switch
          className={styles.switchR}
          checked={useOtherDataList}
          onChange={handleChangeSwitch}
        />
      </div>

      {useOtherDataList && (
        <div className={styles.settingItem}>
          <Input
            className={styles.mb10}
            placeholder="请输入其他文本(最长15个字符)"
            value={otherText}
            onChange={handleChangeOther}
            maxLength={15}
          />
        </div>
      )}
    </div>
  );
};

export default UseOtherDataList;