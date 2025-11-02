import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Title from '../comps/Title';
import FormList from '../comps/FormList';
import CreateForm from './createForm';
import Layout from '../components/Layout';

const Product: React.FC = () => {
  const [openState, setOpenState] = useState(false);

  const open = () => {
    setOpenState(true);
  };

  const handleCreateForm = (state: boolean) => {
    setOpenState(state);
  };

  return (
    <Layout>
      <Title title="项目开发" />
      <div style={{ marginBottom: 16 }}>
        <Button icon={<PlusOutlined />} type="primary" onClick={open}>
          创建
        </Button>
      </div>
      <CreateForm openState={openState} onHandleCreateForm={handleCreateForm} />
      <FormList />
    </Layout>
  );
};

export default Product;
