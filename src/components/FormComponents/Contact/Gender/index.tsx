import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.less';

interface GenderProps {
  dataList: Array<any>;
  useOtherDataList: boolean;
  dataOtherList: Array<any>;
  dataValue: string;
  layoutType: string;
  isDev: boolean;
  isSelected: boolean;
  onChange?: (value: any) => void;
}

const Gender: React.FC<GenderProps> = ({
  dataList,
  useOtherDataList,
  dataOtherList,
  dataValue,
  layoutType,
  isDev,
  isSelected,
  onChange,
}) => {
  const [updateKey, setUpdateKey] = useState('');

  const updateComponentKey = () => {
    setUpdateKey(uuidv4());
  };

  const deleteSubItem = (index: number) => {
    dataList.splice(index, 1);
    updateComponentKey();
  };

  const changeValue = (event: React.FocusEvent<HTMLDivElement>, index: number) => {
    const { innerHTML, innerText } = event.target;
    const hasDataBool = innerText !== null && innerText !== '\n';
    const isOtherBool = index === 2;
    const value = !hasDataBool ? (isOtherBool ? '其他' : '选项') : innerText;

    if (isOtherBool) {
      const _val = value && value.length > 20 ? value.slice(0, 20) : value;
      dataOtherList[0].label = _val;
      dataOtherList[0].value = _val;
    } else {
      dataList[index].label = value;
      dataList[index].value = value;
    }

    updateComponentKey();
  };

  const radioVerticalStyle = {
    display: 'flex',
    lineHeight: '40px',
  };

  const radioStyle = {
    display: 'inline-block',
    minHeight: '40px',
    lineHeight: '40px',
  };

  const options = useOtherDataList ? [...dataList, ...dataOtherList] : dataList;

  return (
    <Checkbox.Group
      value={dataValue as any}
      options={options}
      disabled={isDev}
      style={layoutType === 'vertical' || isSelected ? radioVerticalStyle : radioStyle}
      className={`${styles.groupItem} ${isSelected ? styles.groupItemSelect : ''}`}
      key={isSelected + updateKey}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <div key={index} className={styles.listItem}>
          <div
            className={styles.editorItem}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => changeValue(e, index)}
          >
            {option.label}
          </div>
        </div>
      ))}
    </Checkbox.Group>
  );
};

export default Gender;
