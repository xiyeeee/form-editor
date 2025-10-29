import React from 'react';
import { Rate } from 'antd';
import styles from './index.module.less';

interface RateComponentProps {
  value?: number;
  rateCharacter?: number | string;
  rateCount?: number;
  rateAllowHalf?: boolean;
  isPreviewRender?: boolean;
  onChange?: (value: number) => void;
}

const RateComponent: React.FC<RateComponentProps> = ({
  value = 0,
  rateCharacter,
  rateCount = 5,
  rateAllowHalf = false,
  isPreviewRender = false,
  onChange,
}) => {
  const handleChange = (value: number) => {
    if (!isPreviewRender && onChange) {
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
      disabled={isPreviewRender}
      onChange={handleChange}
    />
  );
};

export default RateComponent;
