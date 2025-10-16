import React from 'react';
import { Input } from 'antd';
import type { FormComponent } from '@/store/formSlice';

interface InputComponentProps {
  id: string;
  placeholder?: string;
  value?: string | null;
  isDev: boolean;
  onChange?: (value: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  id,
  placeholder,
  value,
  isDev,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <Input
      disabled={isDev}
      title={isDev ? '开发模式下禁用' : placeholder}
      className="item-comp"
      value={value || ''}
      onChange={handleChange}
      placeholder={placeholder || '请输入'}
    />
  );
};

export default InputComponent;
