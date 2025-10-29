import React from 'react';
import { Cascader, Input } from 'antd';
import { addressData } from '../../../../pages/FormEditor/addressData';
import styles from './index.module.less';

interface AddressProps {
  id: string;
  address_placeholder: string;
  address_detail_placeholder: string;
  value: string;
  isDev: boolean;
  isPreviewRender?: boolean;
  onChange?: (value: string) => void;
}

const Address: React.FC<AddressProps> = ({
  value,
  address_placeholder,
  address_detail_placeholder,
  isDev,
  isPreviewRender = false,
  onChange,
}) => {
  const options = [...addressData];

  const handleCascaderChange = (selectedValue: any) => {
    if (!isPreviewRender) {
      onChange?.(selectedValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPreviewRender) {
      onChange?.(e.target.value);
    }
  };

  return (
    <div className={styles.addressContainer}>
      <Cascader
        value={value as any}
        options={options}
        placeholder={address_placeholder}
        disabled={isDev || isPreviewRender}
        style={{ marginBottom: '10px', width: '100%' }}
        onChange={handleCascaderChange}
      />
      <Input
        value={value}
        placeholder={address_detail_placeholder}
        disabled={isDev || isPreviewRender}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Address;
