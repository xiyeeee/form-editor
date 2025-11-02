const routes = [
  { path: '/', component: '@/pages/homepage' },
  {
    path: '/workspace',
    component: '@/pages/workSpace',
    routes: [
      { path: '/workspace/product', component: '@/pages/workSpace/product' },
      { path: '/workspace/template', component: '@/pages/workSpace/template' },
      { path: '/workspace/favorites', component: '@/pages/workSpace/favorites' },
      { path: '/workspace/recycle', component: '@/pages/workSpace/recycle' },
    ],
  },
  { path: '/form-editor', component: '@/pages/formEditor' },
];

export default routes;
