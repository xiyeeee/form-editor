import React from 'react';
import { Input as AntInput } from 'antd';
import type { FormComponent } from '@/store/formSlice';

interface EmailComponentProps {
  id: string;
  placeholder?: string;
  value?: string | null;
  isDev: boolean;
  isPreviewRender?: boolean;
  onChange?: (value: string) => void;
}

const EmailComponent: React.FC<EmailComponentProps> = ({
  id,
  placeholder,
  value,
  isDev,
  isPreviewRender = false,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPreviewRender) {
      onChange?.(e.target.value);
    }
  };

  return (
    <AntInput
      disabled={isDev || isPreviewRender}
      title={isDev ? '开发模式下禁用' : isPreviewRender ? '预览模式下禁用' : placeholder}
      className="item-comp"
      value={value || ''}
      onChange={handleChange}
      placeholder={placeholder || '请输入邮箱'}
    />
  );
};

export default EmailComponent;
