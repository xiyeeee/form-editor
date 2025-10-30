import React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'umi';
import Logo from '@/assets/icon/logo.svg';
import styles from './index.module.less';

const { Text } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const size = 'large';

  const toProfile = () => {
    navigate('/workspace'); // 跳转工作台
  };

  const toLogin = () => {
    navigate('/login'); // 跳转登录
  };

  const toGithub = () => {
    // 暂时注释，需要实现toGithub函数
    // window.open('https://github.com', '_blank');
  };

  return (
    <div className={styles.home}>
      <header>
        <div className={styles.nav}>
          <nav>
            <div className={styles.controls}>
              <Button size="large" type="primary" className={styles.login} onClick={() => {}}>
                登录
              </Button>
              <Button type="default" size={size} className={styles.toHome} onClick={toProfile}>
                进入工作台
              </Button>
            </div>
          </nav>
        </div>
      </header>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.title}>
            <img style={{ width: 50, height: 50 }} src={Logo} alt="logo" /> 轻表单
          </div>
          <Text className={styles.description}>表单搭建，如此简单</Text>
        </div>
        <Button type="primary" size={size} className={styles.toUseForm} onClick={toProfile}>
          立即使用
        </Button>
        {/* <Button type="default" onClick={() => {}} size={size}>
          <span className={styles.github}>GitHub仓库</span>
        </Button> */}
      </div>
    </div>
  );
};

export default HomePage;
