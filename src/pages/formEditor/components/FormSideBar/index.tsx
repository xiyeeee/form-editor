import Icon from '../../icon';
import styles from './index.module.less';
import classNames from 'classnames';
interface ClassifyType {
  label: string;
  icon: any;
  type: string;
}
type TProps = {
  activeType: string;
  setActiveType: (type: string) => void;
};
const FormSideBar: React.FC<TProps> = ({ activeType, setActiveType }) => {
  const classifyList: ClassifyType[] = [
    {
      label: '题库',
      icon: Icon.Question,
      type: 'basic',
    },
    {
      label: '主题',
      icon: Icon.Theme,
      type: 'theme',
    },
  ];
  const handleClassifyClick = (type: string) => {
    setActiveType(type);
  };
  return (
    <div className={styles.sidebar}>
      {classifyList.map(item => (
        <div
          onClick={() => handleClassifyClick(item.type)}
          className={classNames(styles.item, {
            [styles.active]: activeType === item.type,
          })}
          key={item.type}
        >
          <img src={item.icon} alt={item.label} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default FormSideBar;
