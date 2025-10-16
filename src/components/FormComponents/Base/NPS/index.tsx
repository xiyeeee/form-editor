import React, { useState, useMemo, useCallback } from 'react';
import styles from './index.module.less';

interface NPSComponentProps {
  id: string;
  value: number;
  startValue: number;
  rateCount: number;
  isDev: boolean;
  onChange?: (value: number) => void;
}

const NPSComponent: React.FC<NPSComponentProps> = ({
  id,
  value,
  startValue,
  rateCount,
  isDev,
  onChange,
}) => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  const list = useMemo(() => {
    const arr = [];
    for (let i = startValue; i <= rateCount; i++) {
      arr.push(i);
    }
    return arr;
  }, [startValue, rateCount]);

  const changeIndex = useCallback((index: number) => {
    setHoverIndex(index);
  }, []);

  const selectValue = useCallback((item: number) => {
    if (!isDev && onChange) {
      onChange(item);
    }
  }, [isDev, onChange]);

  return (
    <div className={styles.npsList}>
      {list.map((item, index) => (
        <div
          key={index}
          className={styles.npsItem}
          onMouseEnter={!isDev ? () => changeIndex(index) : undefined}
          onMouseLeave={!isDev ? () => changeIndex(-1) : undefined}
          onClick={!isDev ? () => selectValue(item) : undefined}
        >
          <span
            className={`
              ${styles.item}
              ${isDev ? styles.isDev : ''}
              ${hoverIndex >= index ? styles.hoverChildrenIndex : ''}
              ${value >= index ? styles.active : ''}
            `}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NPSComponent;