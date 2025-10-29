import React from 'react';
import { Select, Space } from 'antd';
import styles from './index.module.less';

interface SelectRateComponentProps {
  dataList?: any[];
  dataValue?: string;
  layoutType?: string;
  placeholder?: string;
  isDev?: boolean;
  isSelected?: boolean;
  isPreviewRender?: boolean;
  startValue?: number;
  rateCount?: number;
  onChange?: (value: string) => void;
}

const SelectRateComponent: React.FC<SelectRateComponentProps> = ({
  dataList = [],
  dataValue,
  layoutType,
  placeholder = '请选择分数',
  isDev = false,
  isSelected = false,
  isPreviewRender = false,
  startValue = 1,
  rateCount = 5,
  onChange,
}) => {
  const options = React.useMemo(() => {
    const list = [];
    for (let i = startValue; i <= rateCount; i++) {
      list.push({
        label: `${i}分`,
        value: i,
      });
    }
    return list;
  }, [startValue, rateCount]);

  const handleChange = (value: string) => {
    if (!isPreviewRender && onChange) {
      onChange(value);
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Select
        className={styles.selectRate}
        value={dataValue}
        style={{ width: '100%' }}
        disabled={isDev || isPreviewRender}
        placeholder={placeholder}
        options={options}
        onChange={handleChange}
      />
    </Space>
  );
};

export default SelectRateComponent;
