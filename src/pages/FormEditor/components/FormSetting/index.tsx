import styles from './index.module.less';
import { Typography } from 'antd';
const { Title } = Typography;
import DisplayFormBtn from '@/components/FormComponentsSetting/GlobalConfigSetting/DisplayFormBtn';
import { useState } from 'react';
interface Props {
  selectComp: any;
  selectForm: any;
  currentCompId: string;
}
const FormSetting: React.FC<Props> = props => {
  // const [selectForm, setSelectForm] = useState(props.selectForm);
  return (
    <div className={styles.setting}>
      <Title level={5}>
        <div className={styles.titleName}>
          <span className="compIcon">🍋</span>
          <span className={styles.name}> {'表单配置'} </span>
        </div>
      </Title>
      <div className={styles.baseSetting}>
        <div className={styles.categoryName}>基础设置</div>
        <div className={styles.content}>content</div>
        <div className={styles.categoryName}>表单验证</div>
        <div className={styles.content}>content</div>
        <div className={styles.categoryName}>全局表单配置</div>
        <DisplayFormBtn form={props.selectForm}></DisplayFormBtn>
        <div className={styles.content}>content</div>
      </div>
    </div>
  );
};
export default FormSetting;
