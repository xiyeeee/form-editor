import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'umi';
import Logo from '@/assets/icon/logo.svg';
import {
  HomeOutlined,
  FolderOutlined,
  FileTextOutlined,
  HeartOutlined,
  DeleteOutlined,
  DatabaseOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import styles from './index.module.less';

const LogoIcon: React.FC<{ size?: number }> = ({ size = 30 }) => (
  <div style={{ fontSize: 10, color: '#2468f2' }}>
    <img style={{ width: size, height: size }} src={Logo} alt="logo" />
  </div>
);

interface NavItem {
  title: string;
  icon: React.ComponentType<any>;
  route: string;
}

const RouteComp: React.FC = () => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState<string>('');

  const selectWorkSpace = {
    icon: TeamOutlined,
    title: '我的空间',
  };

  const workspaceNavList: NavItem[] = [
    {
      title: '主页',
      icon: HomeOutlined,
      route: '/workspace',
    },
    {
      title: '项目开发',
      icon: FolderOutlined,
      route: '/workspace/product',
    },
    {
      title: '模版库',
      icon: FileTextOutlined,
      route: '/workspace/template',
    },
    {
      title: '收藏',
      icon: HeartOutlined,
      route: '/workspace/favorites',
    },
    {
      title: '回收站',
      icon: DeleteOutlined,
      route: '/workspace/recycle',
    },
  ];

  // 初始化时从localStorage读取active状态
  useEffect(() => {
    const savedActiveRoute = localStorage.getItem('activeRoute');
    if (savedActiveRoute) {
      setActiveRoute(savedActiveRoute);
    } else {
      // 如果没有保存的状态，默认设置为当前路径
      setActiveRoute(location.pathname);
    }
  }, []);

  // 监听路由变化，更新active状态和localStorage
  useEffect(() => {
    const currentPath = location.pathname;
    // 检查当前路径是否在导航列表中
    const isInNavList = workspaceNavList.some(item => item.route === currentPath);

    if (isInNavList) {
      setActiveRoute(currentPath);
      localStorage.setItem('activeRoute', currentPath);
    }
  }, [location.pathname, workspaceNavList]);

  return (
    <div className={styles['side-bar']}>
      <div className={styles['nav-icon']}>
        <span className={styles.icon}>
          <LogoIcon size={30} />
        </span>
        <span className={styles.title}>react轻表单</span>
      </div>
      <div className={styles['nav-data']}>
        <div className={styles['work-space']}>
          <div className={styles['nav-item'] + ' ' + styles['nav-person']}>
            <selectWorkSpace.icon className={styles['img-icon']} />
            <span className={styles.name}>{selectWorkSpace.title}</span>
          </div>
        </div>
        {workspaceNavList.map(item => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.route}
              to={item.route}
              className={`${styles['nav-item']} ${activeRoute === item.route ? styles.active : ''}`}
            >
              <IconComponent className={styles['img-icon']} />
              <span className={styles.name}>{item.title}</span>
            </Link>
          );
        })}
        <div className={styles['nav-item'] + ' ' + styles.storage}>
          <DatabaseOutlined />
          <span className={styles.name}>存储空间</span>
        </div>
      </div>
    </div>
  );
};

export default RouteComp;
