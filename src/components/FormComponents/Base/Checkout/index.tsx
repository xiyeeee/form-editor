import React, { useState, useCallback } from 'react';
import { Checkbox, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.less';

interface OptionItem {
  label: string;
  value: string;
  subType?: string;
  _index?: number;
}

interface Props {
  dataList: OptionItem[];
  dataValue: string;
  layoutType: string;
  isDev: boolean;
  isSelected: boolean;
  isPreviewRender?: boolean;
  onDataChange?: (dataList: OptionItem[]) => void;
}

const Checkout: React.FC<Props> = ({
  dataList,
  dataValue,
  layoutType,
  isDev,
  isSelected,
  isPreviewRender = false,
  onDataChange,
}) => {
  const [updateKey, setUpdateKey] = useState('');

  const updateKeyHandler = useCallback(() => {
    setUpdateKey(uuidv4());
  }, []);

  const deleteSubItem = useCallback(
    (index: number) => {
      const newList = dataList.filter((_, i) => i !== index);
      if (onDataChange) {
        onDataChange(newList);
      }
      updateKeyHandler();
    },
    [dataList, onDataChange, updateKeyHandler]
  );

  const changeValue = useCallback(
    (event: React.FocusEvent<HTMLDivElement>, index: number) => {
      const { innerText } = event.target;
      const hasDataBool = innerText !== null && innerText !== '\n';
      const isOtherBool = dataList[index].subType === 'other';
      const value = !hasDataBool ? (isOtherBool ? '其他' : '选项') : innerText;
      const isChangeBool = dataList[index].label !== value;

      if (!isChangeBool) {
        return;
      }

      const newList = dataList.map((item, i) =>
        i === index ? { ...item, label: value, value: isOtherBool ? item.value : value } : item
      );

      if (onDataChange) {
        onDataChange(newList);
      }
      updateKeyHandler();
    },
    [dataList, onDataChange, updateKeyHandler]
  );

  return (
    <div className={`${styles.groupItem} ${isSelected ? styles.groupItemSelect : ''}`}>
      {dataList.map((option, index) => (
        <div key={index} className={styles.checkboxItem}>
          <Checkbox
            value={option.value}
            disabled={isDev || isPreviewRender}
            checked={dataValue === option.value}
            onChange={e => {
              if (onDataChange && !isPreviewRender) {
                const newValue = e.target.checked ? option.value : '';
                onDataChange(
                  dataList.map(item => ({
                    ...item,
                    value: item.value === newValue ? newValue : '',
                  }))
                );
              }
            }}
          >
            <Input
              className={styles.editorItem}
              value={option.label}
              disabled={isPreviewRender}
              onChange={e => {
                if (!isPreviewRender && isDev) {
                  const newList = dataList.map((item, i) =>
                    i === index ? { ...item, label: e.target.value, value: e.target.value } : item
                  );
                  if (onDataChange) {
                    onDataChange(newList);
                  }
                }
              }}
            />
          </Checkbox>
          {option.subType === 'other' && (
            <span className={styles.otherVal}>
              <Input
                className={styles.itemComp}
                value={option.value}
                placeholder="待填表者更新"
                disabled={isPreviewRender}
                onChange={e => {
                  if (!isPreviewRender) {
                    const newList = dataList.map((item, i) =>
                      i === index ? { ...item, value: e.target.value } : item
                    );
                    if (onDataChange) {
                      onDataChange(newList);
                    }
                  }
                }}
              />
            </span>
          )}
          {!isPreviewRender && (
            <span
              className={styles.delete}
              onClick={() => deleteSubItem(index)}
              title={option.label}
            >
              <CloseOutlined />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Checkout;
