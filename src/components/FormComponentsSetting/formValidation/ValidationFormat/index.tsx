import React from 'react';
import { Typography, Select, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface ValidationFormatProps {
  comp?: {
    formValidationFormat?: string;
    formValidationFormatRegex?: string;
  };
}

const ValidationFormat: React.FC<ValidationFormatProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const formList = [
    {
      name: '手机号',
      value: 'phone'
    },
    {
      name: '数字',
      value: 'number'
    },
    {
      name: '网站',
      value: 'website'
    },
    {
      name: '身份证',
      value: 'idCard'
    },
    {
      name: '邮件',
      value: 'email'
    },
    {
      name: '自定义正则',
      value: 'regular'
    }
  ];

  const formValidationFormat = comp?.formValidationFormat || currentComponent?.formValidationFormat || '';
  const formValidationFormatRegex = comp?.formValidationFormatRegex || currentComponent?.formValidationFormatRegex || '';

  const handleChangeInput = (value: string) => {
    dispatch(updateComponent({
      formValidationFormat: value
    }));
  };

  const handleChangeRegex = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    dispatch(updateComponent({
      formValidationFormatRegex: value
    }));
  };

  return (
    <div>
      <div className={styles.settingItem}>
        <Text type="secondary" className={styles.secondary}>格式</Text>
        <Select
          value={formValidationFormat}
          style={{ width: 120 }}
          className={styles.absR}
          onChange={handleChangeInput}
        >
          {formList.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
      </div>

      {formValidationFormat === 'regular' && (
        <div className={styles.settingItem}>
          <TextArea
            value={formValidationFormatRegex}
            placeholder="请输入自定义正则表达式"
            autoSize={{ minRows: 2, maxRows: 3 }}
            allowClear
            maxLength={40}
            onChange={handleChangeRegex}
          />
        </div>
      )}
    </div>
  );
};

export default ValidationFormat;