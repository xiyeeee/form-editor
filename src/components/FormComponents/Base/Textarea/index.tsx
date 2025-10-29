import React from 'react';
import { Input } from 'antd';
import type { FormComponent } from '@/store/formSlice';

interface TextareaComponentProps {
  id: string;
  placeholder?: string;
  value?: string | null;
  isDev: boolean;
  isPreviewRender?: boolean;
  onChange?: (value: string) => void;
}

const TextareaComponent: React.FC<TextareaComponentProps> = ({
  id,
  placeholder,
  value,
  isDev,
  isPreviewRender = false,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isPreviewRender) {
      onChange?.(e.target.value);
    }
  };

  return (
    <Input.TextArea
      disabled={isDev || isPreviewRender}
      title={isDev ? '开发模式下禁用' : isPreviewRender ? '预览模式下禁用' : placeholder}
      className="item-comp"
      value={value || ''}
      onChange={handleChange}
      placeholder={placeholder || '请输入多行文本'}
      autoSize={{ minRows: 3, maxRows: 6 }}
    />
  );
};

export default TextareaComponent;
