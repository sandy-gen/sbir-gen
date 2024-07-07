import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

import Dashboard from 'pages/private_pages/dashboard';
import MyTopics from 'pages/private_pages/my-topics';
import OpenTopics from 'pages/private_pages/open-topics';
import path from 'path';
import ProductsPage from 'pages/my-topics/products';


// render - sample pageimport Dashboard from '../pages/extra-pages/dashboard';

const DashboardPage = Loadable(lazy(() => import('pages/private_pages/dashboard')));
const MyTopicsPage = Loadable(lazy(() => import('pages/private_pages/my-topics')));
const OpenTopicsPage = Loadable(lazy(() => import('pages/private_pages/open-topics')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/products',
          element: <ProductsPage />
        },
        {
          path: '/my-topics',
          element: <MyTopics />,
        },
        {
          path: '/open-topics',
          element: <OpenTopics />,
        },
      ]
    },

  ]
};

export default MainRoutes;
