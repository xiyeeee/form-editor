import React, { useState } from 'react';
import { useNavigate } from 'umi';
import { Typography, Tag } from 'antd';
// Simple current time function
const getCurrentTime = () => {
  return new Date().toLocaleString();
};
import NoDataImg from '@/assets/form-editor/no-data.svg';
import FormIcon from '@/assets/form-editor/no-data.svg';
import styles from './formList.module.less';

const { Title, Text } = Typography;

interface FormItem {
  id: number;
  name: string;
  state: string;
  time: string;
  show_count: number;
  commit_count: number;
  today_add_count: number;
}

interface CountItem {
  label: string;
  value: string;
}

interface FormListProps {
  type?: 'template';
}

const FormList: React.FC<FormListProps> = ({ type }) => {
  const navigate = useNavigate();
  const [defCount] = useState(42);

  const toEditor = (item: FormItem) => {
    const url = `/form-editor`;
    navigate(url);
  };

  const formList: FormItem[] = [
    {
      id: 1,
      name: '会员申请表',
      state: '待发布',
      time: '编辑于 2024-10-01 12:23',
      show_count: 100,
      commit_count: 22,
      today_add_count: 12,
    },
    {
      id: 2,
      name: '会员申请表',
      state: '待发布',
      time: '编辑于 2024-10-01 12:23',
      show_count: 100,
      commit_count: 22,
      today_add_count: 12,
    },
    {
      id: 3,
      name: '会员申请表',
      state: '待发布',
      time: '编辑于 2024-10-01 12:23',
      show_count: 100,
      commit_count: 22,
      today_add_count: 12,
    },
    {
      id: 4,
      name: '会员申请表',
      state: '待发布',
      time: '编辑于 2024-10-01 12:23',
      show_count: 100,
      commit_count: 22,
      today_add_count: 12,
    },
  ];

  const countList: CountItem[] = [
    {
      label: '浏览数',
      value: 'show_count',
    },
    {
      label: '提交数',
      value: 'commit_count',
    },
    {
      label: '今日新增',
      value: 'today_add_count',
    },
  ];

  if (type === 'template') {
    return (
      <div className={styles['list-body']}>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <img src={NoDataImg} alt="暂无数据" style={{ width: '200px', opacity: 0.5 }} />
          <p style={{ color: '#999', marginTop: '20px' }}>暂无模版数据</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['list-body']}>
      {formList.map(item => (
        <div key={item.id} className={styles.item}>
          <div className={styles['form-item-body']}>
            <div className={styles.icon}>
              <img src={FormIcon} alt="" />
            </div>
            <div className={styles.data} onClick={() => toEditor(item)} title={item.name}>
              <Title level={5} className={styles['label-text']}>
                {item.name}
              </Title>
              <Text type="secondary">{getCurrentTime()}</Text>
            </div>
            <span className={styles.state}>
              <Tag bordered={false} color="processing">
                {item.state}
              </Tag>
            </span>
          </div>
          <div className={styles.des}>
            {countList.map((countItem, index) => (
              <div key={index} className={styles['count-item']}>
                <Text className={styles.label} type="secondary">
                  {countItem.label}
                </Text>
                <span className={styles['data-val']}>{defCount || '-'}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormList;
