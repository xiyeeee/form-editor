import React from 'react';
import { Select } from 'antd';
import type { FormComponent } from '@/store/formSlice';

interface SelectComponentProps {
  id: string;
  dataList?: any[];
  isRequired?: boolean;
  value?: string | null;
  isDev: boolean;
  isPreviewRender?: boolean;
  onChange?: (value: string) => void;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  id,
  dataList = [],
  isRequired,
  value,
  isDev,
  isPreviewRender = false,
  onChange,
}) => {
  const handleChange = (selectedValue: string) => {
    if (!isPreviewRender) {
      onChange?.(selectedValue);
    }
  };

  return (
    <Select
      disabled={isDev || isPreviewRender}
      value={value}
      onChange={handleChange}
      placeholder="请选择"
      style={{ width: '100%' }}
    >
      {dataList.map((item, index) => (
        <Select.Option key={item.id || index} value={item.value}>
          {item.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectComponent;
