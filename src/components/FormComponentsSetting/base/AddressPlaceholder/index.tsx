import React from 'react';
import { Typography, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface AddressPlaceholderProps {
  comp?: {
    address_placeholder?: string;
    address_detail_placeholder?: string;
  };
}

const AddressPlaceholder: React.FC<AddressPlaceholderProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const addressPlaceholder = comp?.address_placeholder || currentComponent?.address_placeholder || '';
  const addressDetailPlaceholder = comp?.address_detail_placeholder || currentComponent?.address_detail_placeholder || '';

  const handleAddressPlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateComponent({
      address_placeholder: e.target.value
    }));
  };

  const handleAddressDetailPlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateComponent({
      address_detail_placeholder: e.target.value
    }));
  };

  return (
    <div>
      <Text type="secondary" className={styles.blockTitle}>选择框省/市/区提示</Text>
      <Input
        className={styles.input}
        placeholder="输入框提示"
        allowClear
        value={addressPlaceholder}
        onChange={handleAddressPlaceholderChange}
      />

      <Text type="secondary" className={styles.blockTitle}>详细地址输入框提示</Text>
      <Input
        className={styles.input}
        placeholder="输入框提示"
        allowClear
        value={addressDetailPlaceholder}
        onChange={handleAddressDetailPlaceholderChange}
      />
    </div>
  );
};

export default AddressPlaceholder;