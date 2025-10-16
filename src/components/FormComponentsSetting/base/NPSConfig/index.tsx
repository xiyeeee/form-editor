import React, { useEffect, useState } from 'react';
import { Typography, Select, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;
const { Option } = Select;

interface NPSConfigProps {
  comp?: {
    startValue?: number;
    rateCount?: number;
    startValueList?: number[];
  };
}

const NPSConfig: React.FC<NPSConfigProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);
  const [dataList, setDataList] = useState<{name: number, value: number}[]>([]);

  useEffect(() => {
    const list = [];
    for (let i = 3; i <= 10; i++) {
      list.push({
        name: i,
        value: i
      });
    }
    setDataList(list);
  }, []);

  const startValue = comp?.startValue ?? currentComponent?.startValue ?? 0;
  const rateCount = comp?.rateCount ?? currentComponent?.rateCount ?? 10;
  const startValueList = comp?.startValueList ?? currentComponent?.startValueList ?? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const changeStartValue = (value: number) => {
    dispatch(updateComponent({
      startValue: value
    }));
  };

  const changeEndValue = (value: number) => {
    dispatch(updateComponent({
      rateCount: value
    }));
  };

  return (
    <div>
      <div className={styles.settingItem}>
        <Text type="secondary" className={styles.blockTitle2}>
          取值范围
          <Tooltip placement="top" title="开始值可以选择0，结束值最小值是3">
            <QuestionCircleOutlined />
          </Tooltip>
        </Text>
      </div>
      <div className={styles.grid2}>
        <Select
          value={startValue}
          style={{ width: 110 }}
          className={styles.absItem}
          onChange={changeStartValue}
        >
          {startValueList.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
        <Select
          value={rateCount}
          style={{ width: 110 }}
          className={styles.absItem}
          onChange={changeEndValue}
        >
          {dataList.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default NPSConfig;