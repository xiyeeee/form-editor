import React from 'react';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { TextArea } = Input;

interface CustomTextProps {
  comp?: {
    customErrorMessage?: string;
  };
}

const CustomText: React.FC<CustomTextProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const customErrorMessage = comp?.customErrorMessage || currentComponent?.customErrorMessage || '';

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    dispatch(updateComponent({
      customErrorMessage: value
    }));
  };

  return (
    <div className={styles.settingItem}>
      <TextArea
        value={customErrorMessage}
        placeholder="请输入自定义错误提示"
        autoSize={{ minRows: 2, maxRows: 3 }}
        allowClear
        maxLength={40}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default CustomText;