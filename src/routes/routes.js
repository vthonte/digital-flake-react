export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [

    {
      name: 'Home',
      to: '/',
      active: true

    },
    {
      name: 'Category',
      to: '/digital-flake/category',
      active: true

    },
    {
      name: 'Products',
      to: '/digital-flake/products',
      active: true

    }
  ]
};

export default [
  dashboardRoutes,

];
