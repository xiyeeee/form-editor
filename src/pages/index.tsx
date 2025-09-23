
import React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'umi';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const navigate = useNavigate();

  const goToFormEditor = () => {
    navigate('/form-editor');
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Title level={1}>React 动态表单生成器</Title>
      <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
        拖拽式表单设计器，快速构建您的表单应用
      </Paragraph>
      <Button
        type="primary"
        size="large"
        onClick={goToFormEditor}
        style={{ marginTop: '20px' }}
      >
        开始创建表单
      </Button>
    </div>
  );
}
