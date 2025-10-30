import React from 'react';
import Title from '../comps/title';
import FormList from '../comps/formList';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Title title="主页" />
      <FormList />
    </Layout>
  );
};

export default HomePage;
