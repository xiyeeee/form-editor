import React from 'react';
import Title from './comps/Title';
import FormList from './comps/FormList';
import Layout from './components/Layout';

const WorkSpace: React.FC = () => {
  return (
    <Layout>
      <Title title="主页" />
      <FormList />
    </Layout>
  );
};

export default WorkSpace;
