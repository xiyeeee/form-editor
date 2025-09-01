import React from 'react';
import { Radio as AntRadio } from 'antd';
import type { FormComponent } from '@/store/formSlice';
import styles from './index.module.less';
interface RadioComponentProps {
  id: string;
  dataList?: any[];
  isRequired?: boolean;
  value?: string | null;
  isDev: boolean;
  onChange?: (value: string) => void;
}

const RadioComponent: React.FC<RadioComponentProps> = ({
  id,
  dataList = [],
  isRequired,
  value,
  isDev,
  onChange,
}) => {
  const handleChange = (e: any) => {
    onChange?.(e.target.value);
  };

  return (
    <AntRadio.Group
      disabled={isDev}
      value={value}
      onChange={handleChange}
      className={styles.radioGroup}
    >
      {dataList.map((item, index) => (
        <AntRadio key={item.id || index} value={item.value}>
          {item.label}
        </AntRadio>
      ))}
    </AntRadio.Group>
  );
};

export default RadioComponent;
