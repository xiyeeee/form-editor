import React from 'react';
import Title from '../comps/title';
import FormList from '../comps/formList';
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
