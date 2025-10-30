import React from 'react';
import styles from './title.module.less';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className={styles.category}>
      <div className={styles.name}>{title}</div>
    </div>
  );
};

export default Title;

