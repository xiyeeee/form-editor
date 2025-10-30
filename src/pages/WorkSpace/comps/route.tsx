import React from 'react';
import { Link } from 'umi';
// Simple Logo component
const LogoIcon: React.FC<{ size?: number }> = ({ size = 30 }) => (
  <div style={{ fontSize: size, color: '#2468f2' }}>🍋</div>
);
import Home from '@/assets/form-editor/home.svg';
import Collection from '@/assets/form-editor/collcetion.svg';
import Delete from '@/assets/form-editor/delete.svg';
import Folder from '@/assets/form-editor/folder.svg';
import Storage from '@/assets/form-editor/storage.svg';
import Template from '@/assets/form-editor/template.svg';
import Person from '@/assets/form-editor/person.svg';
import styles from './route.module.less';

interface NavItem {
  title: string;
  icon: string;
  route: string;
}

const RouteComp: React.FC = () => {
  const selectWorkSpace = {
    icon: Person,
    title: '我的空间',
  };

  const workspaceNavList: NavItem[] = [
    {
      title: '主页',
      icon: Home,
      route: '/',
    },
    {
      title: '项目开发',
      icon: Folder,
      route: '/product',
    },
    {
      title: '模版库',
      icon: Template,
      route: '/template',
    },
    {
      title: '收藏',
      icon: Collection,
      route: '/favorites',
    },
    {
      title: '回收站',
      icon: Delete,
      route: '/recycle',
    },
  ];

  return (
    <div className={styles['side-bar']}>
      <div className={styles['nav-icon']}>
        <span className={styles.icon}>
          <LogoIcon size={30} />
        </span>
        <span className={styles.title}>柠檬轻表单</span>
      </div>
      <div className={styles['nav-data']}>
        <div className={styles['work-space']}>
          <div className={styles['nav-item'] + ' ' + styles['nav-person']}>
            <img className={styles['img-icon']} src={selectWorkSpace.icon} alt="" />
            <span className={styles.name}>{selectWorkSpace.title}</span>
          </div>
        </div>
        {workspaceNavList.map(item => (
          <Link key={item.route} to={item.route} className={styles['nav-item']}>
            <img className={styles['img-icon']} src={item.icon} alt="" />
            <span className={styles.name}>{item.title}</span>
          </Link>
        ))}
        <div className={styles['nav-item'] + ' ' + styles.storage}>
          <img src={Storage} alt="" />
          <span className={styles.name}>存储空间</span>
        </div>
      </div>
    </div>
  );
};

export default RouteComp;
