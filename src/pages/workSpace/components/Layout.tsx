import React from 'react';
import NavComp from '../comps/PageNav';
import RouteComp from '../comps/SiderBar';
import styles from '../index.module.less';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.workspace}>
      <div className={styles.body}>
        <RouteComp />
        <div className={styles['page-content']}>
          <NavComp />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

