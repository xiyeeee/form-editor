import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/form-editor', component: '@/pages/FormEditor' },
  ],
  plugins: ['@umijs/plugins/dist/antd'],
  antd: {},
  npmClient: 'yarn',
  hash: true,
});
