import React from 'react';
import { Typography, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateComponent } from '@/store/formSlice';
import styles from './index.module.less';

const { Text } = Typography;
const { Option } = Select;

interface SignCreateImgTypeProps {
  comp?: {
    sign_create_type?: string;
  };
}

const SignCreateImgType: React.FC<SignCreateImgTypeProps> = ({ comp }) => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.form.currentComponent);

  const imgTypeList = [
    {
      label: 'JPG',
      value: 'jpg'
    },
    {
      label: 'PNG',
      value: 'png'
    }
  ];

  const signCreateType = comp?.sign_create_type || currentComponent?.sign_create_type || 'jpg';

  const handleChangeType = (value: string) => {
    dispatch(updateComponent({
      sign_create_type: value
    }));
  };

  return (
    <div className={styles.settingItem}>
      <Text type="secondary" className={styles.blockTitle2}>保存图片格式</Text>
      <Select
        value={signCreateType}
        style={{ width: 120 }}
        className={styles.absR}
        onChange={handleChangeType}
      >
        {imgTypeList.map((item) => (
          <Option key={item.value} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SignCreateImgType;