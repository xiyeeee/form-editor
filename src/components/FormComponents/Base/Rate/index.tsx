import React from 'react';
import { Rate } from 'antd';
import styles from './index.module.less';

interface RateComponentProps {
  value?: number;
  rateCharacter?: number | string;
  rateCount?: number;
  rateAllowHalf?: boolean;
  onChange?: (value: number) => void;
}

const RateComponent: React.FC<RateComponentProps> = ({
  value = 0,
  rateCharacter,
  rateCount = 5,
  rateAllowHalf = false,
  onChange
}) => {
  const handleChange = (value: number) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Rate
      className={styles.rate}
      character={rateCharacter}
      count={rateCount}
      allowHalf={rateAllowHalf}
      value={value}
      onChange={handleChange}
    />
  );
};

export default RateComponent;