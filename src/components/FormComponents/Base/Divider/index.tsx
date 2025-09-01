import React from 'react';
import { Divider } from 'antd';
import styles from './index.module.less';

interface DividerComponentProps {
  type?: string;
  dividerValue?: string;
  dividerBorderType?: boolean; // 虚线类型
  position?: 'left' | 'right' | 'center';
  isDev?: boolean;
}

const DividerComponent: React.FC<DividerComponentProps> = ({
  type,
  dividerValue = '',
  dividerBorderType = false,
  position = 'center',
  isDev = false
}) => {
  return (
    <div>
      <Divider
        orientation={position}
        dashed={dividerBorderType}
        className={styles.divider}
      >
        {dividerValue}
      </Divider>
    </div>
  );
};

export default DividerComponent;