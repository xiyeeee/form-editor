import { defineConfig } from 'umi';
import routes from './src/routes/index';
export default defineConfig({
  routes: routes,
  plugins: ['@umijs/plugins/dist/antd'],
  antd: {},
  npmClient: 'yarn',
  hash: true,
});
