import React from 'react';
import { Select as AntSelect } from 'antd';
import type { FormComponent } from '@/store/formSlice';

interface SelectComponentProps {
  id: string;
  dataList?: any[];
  isRequired?: boolean;
  value?: string | null;
  isDev: boolean;
  onChange?: (value: string) => void;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ 
  id, 
  dataList = [], 
  isRequired, 
  value, 
  isDev, 
  onChange 
}) => {
  const handleChange = (selectedValue: string) => {
    onChange?.(selectedValue);
  };

  return (
    <AntSelect
      disabled={isDev}
      value={value}
      onChange={handleChange}
      placeholder="请选择"
      style={{ width: '100%' }}
    >
      {dataList.map((item, index) => (
        <AntSelect.Option key={item.id || index} value={item.value}>
          {item.label}
        </AntSelect.Option>
      ))}
    </AntSelect>
  );
};

export default SelectComponent;