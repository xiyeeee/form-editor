import React from 'react';
import { Input as AntInput } from 'antd';
import type { FormComponent } from '@/store/formSlice';

interface PhoneComponentProps {
  id: string;
  placeholder?: string;
  value?: string | null;
  isDev: boolean;
  onChange?: (value: string) => void;
}

const PhoneComponent: React.FC<PhoneComponentProps> = ({ 
  id, 
  placeholder, 
  value, 
  isDev, 
  onChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <AntInput
      disabled={isDev}
      title={isDev ? '开发模式下禁用' : placeholder}
      className="item-comp"
      value={value || ''}
      onChange={handleChange}
      placeholder={placeholder || '请输入手机号'}
    />
  );
};

export default PhoneComponent;