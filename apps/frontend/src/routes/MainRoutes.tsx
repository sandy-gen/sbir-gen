import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

import Dashboard from 'pages/extra-pages/dashboard';
import MyTopics from 'pages/extra-pages/my-topics';
import OpenTopics from 'pages/extra-pages/open-topics';


// render - sample pageimport Dashboard from '../pages/extra-pages/dashboard';

const DashboardPage = Loadable(lazy(() => import('pages/extra-pages/dashboard')));
const MyTopicsPage = Loadable(lazy(() => import('pages/extra-pages/my-topics')));
const OpenTopicsPage = Loadable(lazy(() => import('pages/extra-pages/open-topics')));

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
