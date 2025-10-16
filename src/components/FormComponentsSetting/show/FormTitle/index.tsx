
import React from 'react';
import { Typography, Input, Select, Switch, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';
import { optionData, textOrButtonSizeData } from '../../settingconfigdata';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface FormTitleProps {
  comp?: {
    titleImageShow?: boolean;
    titleImageUrl?: string;
    titleValue?: string;
    titleSize?: string;
    titleDescriptionShow?: boolean;
    titleDescription?: string;
    titleDescriptionPosition?: string;
  };
}

const FormTitle: React.FC<FormTitleProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);
  const orientationList = textOrButtonSizeData;
  const positionList = optionData;

  const actualComp = comp || currentComponent || {};

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, params?: string) => {
    const data = event.target.value;
    dispatch(updateComponent({
      [params || 'titleValue']: data
    }));
  };

  const changeSelect = (value: string, param?: string) => {
    dispatch(updateComponent({
      [param || 'titleSize']: value
    }));
  };

  const changeValue = (checked: boolean, param?: string) => {
    dispatch(updateComponent({
      [param || 'titleImageShow']: checked
    }));
  };

  return (
    <>
      <div className={`${styles.settingItem} ${styles.h42}`}>
        <Text type="secondary" className={styles.secondary}>显示标题图片</Text>
        <Space direction="vertical" className={`${styles.absR} ${styles.switchR}`}>
          <Switch
            checked={actualComp.titleImageShow}
            onChange={(checked) => changeValue(checked, 'titleImageShow')}
          />
        </Space>
      </div>

      <Text type="secondary" className={styles.blockTitle}>标题图片</Text>
      <Input
        className={styles.mb10}
        placeholder="请输入图片URL"
        value={actualComp.titleImageUrl || ''}
        onChange={(e) => handleChangeInput(e, 'titleImageUrl')}
        maxLength={400}
      />

      <Text type="secondary" className={styles.blockTitle}>表单标题</Text>
      <Input
        className={styles.mb10}
        placeholder="请输入标题文字（最多30个字）"
        value={actualComp.titleValue || ''}
        onChange={(e) => handleChangeInput(e)}
        maxLength={30}
      />

      <div className={`${styles.settingItem} ${styles.h50}`}>
        <Text type="secondary" className={styles.blockTitle2}>标题大小</Text>
        <Select
          value={actualComp.titleSize}
          style={{ width: 120 }}
          className={styles.absR}
          onChange={(value) => changeSelect(value, 'titleSize')}
        >
          {orientationList.map(item => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
      </div>

      <div className={`${styles.settingItem} ${styles.h42}`}>
        <Text type="secondary" className={styles.secondary}>显示标题描述</Text>
        <Space direction="vertical" className={`${styles.absR} ${styles.switchR}`}>
          <Switch
            checked={actualComp.titleDescriptionShow}
            onChange={(checked) => changeValue(checked, 'titleDescriptionShow')}
          />
        </Space>
      </div>

      <Text type="secondary" className={styles.blockTitle}>标题描述</Text>
      <TextArea
        className={`${styles.mb10} ${styles.mB10}`}
        placeholder="请输入描述"
        allowClear
        showCount
        value={actualComp.titleDescription || ''}
        onChange={(e) => handleChangeInput(e, 'titleDescription')}
        autoSize={{ minRows: 2, maxRows: 5 }}
        maxLength={200}
      />

      <div className={`${styles.settingItem} ${styles.h50}`}>
        <Text type="secondary" className={styles.blockTitle2}>位置(标题+描述)</Text>
        <Select
          value={actualComp.titleDescriptionPosition}
          style={{ width: 120 }}
          className={styles.absR}
          onChange={(value) => changeSelect(value, 'titleDescriptionPosition')}
        >
          {positionList.map(item => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
    </>
  );
};

export default FormTitle;