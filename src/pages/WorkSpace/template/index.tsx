import React from 'react';
import Title from '../comps/title';
import FormList from '../comps/formList';
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
