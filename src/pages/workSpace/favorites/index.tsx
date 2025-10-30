import React from 'react';
import Title from '../comps/Title';
import FormList from '../comps/FormList';
import Layout from '../components/Layout';

const Favorites: React.FC = () => {
  return (
    <Layout>
      <Title title="收藏" />
      <FormList />
    </Layout>
  );
};

export default Favorites;
