import React, { useState } from 'react';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent, setCurrentComponent } from '@/store/formSlice';
import styles from './index.module.less';
import { HolderOutlined } from '@ant-design/icons';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const { Text } = Typography;

interface DataListProps {
  comp?: {
    dataList?: Array<{
      label: string;
      value: string;
    }>;
  };
}

// 可拖拽的选项项组件
interface SortableItemProps {
  id: string;
  item: any;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, item }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.formItem} ${styles.handle} ${isDragging ? styles.dragging : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className={styles.activeDrag}>
        <HolderOutlined />
      </div>
      <span className={styles.label}>{item?.value}</span>
    </div>
  );
};

const DataList: React.FC<DataListProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);
  const [activeId, setActiveId] = useState<string | null>(null);

  const dataList = comp?.dataList || currentComponent?.dataList || [];

  // 拖拽传感器
  const sensors = useSensors(useSensor(PointerSensor));

  // 拖拽结束事件
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = dataList.findIndex((item, index) => `${item.value}-${index}` === active.id);
      const newIndex = dataList.findIndex((item, index) => `${item.value}-${index}` === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        // 使用 arrayMove 重新排序
        const newDataList = arrayMove(dataList, oldIndex, newIndex);

        // 更新组件数据
        if (currentComponent) {
          const updatedComponent = {
            ...currentComponent,
            dataList: newDataList,
          };

          dispatch(updateComponent({ dataList: newDataList }));
          dispatch(setCurrentComponent(updatedComponent));
        }
      }
    }

    setActiveId(null);
  };

  if (!dataList.length) {
    return null;
  }

  return (
    <div className={styles.settingItem}>
      <Text type="secondary" className={styles.secondary}>
        选项排序
      </Text>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={dataList.map((item, index) => `${item.value}-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          <div className={styles.compList}>
            {dataList.map((item, index) => (
              <SortableItem
                key={`${item.value}-${index}`}
                id={`${item.value}-${index}`}
                item={item}
              />
            ))}
          </div>
        </SortableContext>

        {/* 拖拽遮罩层 */}
        <DragOverlay>
          {activeId ? (
            <div style={{ opacity: 0.95 }} className={`${styles.formItem} ${styles.handle}`}>
              <div className={styles.activeDrag}>
                <HolderOutlined />
              </div>
              <span className={styles.label}>
                {dataList.find((item, index) => `${item.value}-${index}` === activeId)?.value}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DataList;
