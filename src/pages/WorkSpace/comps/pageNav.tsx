import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
// Simple storage mock
const storageStore = () => ({
  getWebStorage: (key: string) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
});
import styles from './pageNav.module.less';

const { Search } = Input;

const PageNav: React.FC = () => {
  const [userName, setUserName] = useState<string>('用户');
  const webStorage = storageStore();

  const userNamePre = userName?.slice(0, 1)?.toUpperCase() || '用';

  const getAuthInfo = () => {
    const authInfo = webStorage.getWebStorage('AuthInfo');
    setUserName(authInfo?.userName || '用户');
  };

  useEffect(() => {
    getAuthInfo();
  }, []);

  return (
    <div className={styles['nav-content']}>
      <div className={styles.search}>
        <Search className={styles['search-input']} placeholder="请输入搜索内容" />
      </div>
      <div className={styles['user-profile']}>
        <span className={styles.icon}>{userNamePre}</span>
      </div>
    </div>
  );
};

export default PageNav;
