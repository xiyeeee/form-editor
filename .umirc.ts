import { defineConfig } from 'umi';
import routes from './src/routes/index';
export default defineConfig({
  routes: routes,
  plugins: ['@umijs/plugins/dist/antd'],
  antd: {},
  npmClient: 'yarn',
  hash: true,
  // 配置 favicon（UmiJS 4 会自动处理 public 目录下的 favicon）
  favicons: ['/favicon.svg'],
});
