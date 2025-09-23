import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';

interface Props {
  open: boolean;
  dataList: any[];
  onBatchOperation: (isOk: boolean, dataList: any[]) => void;
}

const BatchOptionModal: React.FC<Props> = ({ 
  open, 
  dataList, 
  onBatchOperation 
}) => {
  const [batchDataValue, setBatchDataValue] = useState('');

  useEffect(() => {
    if (open && dataList.length > 0) {
      const val = dataList.map(item => item.value).join('\n');
      setBatchDataValue(val);
    } else {
      setBatchDataValue('');
    }
  }, [open, dataList]);

  const handleSubmit = (isOk: boolean) => {
    if (isOk) {
      const nextData: any[] = [];
      if (batchDataValue.trim()) {
        const _list = batchDataValue
          .split('\n')
          .filter(item => item?.trim().length > 0);
        
        if (Array.isArray(_list)) {
          _list.forEach((element, index) => {
            nextData.push({
              label: element.trim(),
              value: element.trim(),
              _index: index
            });
          });
        }
      }
      onBatchOperation(true, nextData);
    } else {
      onBatchOperation(false, dataList);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBatchDataValue(e.target.value);
  };

  return (
    <Modal
      title="批次操作数据"
      open={open}
      onOk={() => handleSubmit(true)}
      onCancel={() => handleSubmit(false)}
      okText="确定"
      cancelText="取消"
    >
      <Input.TextArea
        placeholder="请输入批次操作数据（每行一条数据）"
        allowClear
        value={batchDataValue}
        onChange={handleChangeInput}
        autoSize={{ minRows: 5, maxRows: 50 }}
      />
    </Modal>
  );
};

export default BatchOptionModal;