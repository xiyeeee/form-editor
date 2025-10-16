import React from 'react';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;

interface DataListProps {
  comp?: {
    dataList?: Array<{
      label: string;
      value: string;
    }>;
  };
}

const DataList: React.FC<DataListProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const dataList = comp?.dataList || currentComponent?.dataList || [];

  // 暂时移除拖拽功能，因为需要安装额外的依赖
  // 在实际使用中可以安装 react-beautiful-dnd 或 @dnd-kit 来实现拖拽
  const handleDragEnd = () => {
    // 拖拽结束后的处理逻辑
    console.log('Drag ended');
  };

  if (!dataList.length) {
    return null;
  }

  return (
    <div className={styles.settingItem}>
      <Text type="secondary" className={styles.secondary}>选项排序</Text>

      <div className={styles.compList}>
        {dataList.map((item, index) => (
          <div
            key={`${item.value}-${index}`}
            className={`${styles.formItem} ${styles.handle}`}
            draggable
            onDragEnd={handleDragEnd}
          >
            <img src="/src/assets/form/drag.svg" alt="drag" />
            <span className={styles.label}>
              {item?.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataList;