import React from 'react';
import Title from '../comps/Title';
import FormList from '../comps/FormList';
import Layout from '../components/Layout';

const Template: React.FC = () => {
  return (
    <Layout>
      <Title title="模版" />
      <FormList type="template" />
    </Layout>
  );
};

export default Template;
