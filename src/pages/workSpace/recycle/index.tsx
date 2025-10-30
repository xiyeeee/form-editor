import React from 'react';
import Title from '../comps/Title';
import FormList from '../comps/FormList';
import Layout from '../components/Layout';

const Recycle: React.FC = () => {
  return (
    <Layout>
      <Title title="回收站" />
      <FormList />
    </Layout>
  );
};

export default Recycle;
