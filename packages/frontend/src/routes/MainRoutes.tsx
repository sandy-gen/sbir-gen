import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import { FormattedMessage } from 'react-intl';

const DashboardPage = Loadable(lazy(() => import('pages/private_pages/dashboard')));
const MyProposalsPage = Loadable(lazy(() => import('pages/private_pages/my-proposals')));
const OpenTopicsPage = Loadable(lazy(() => import('pages/private_pages/open-topics')));
const AwardsPage = Loadable(lazy(() => import('pages/private_pages/awards')));
const ProductsPage = Loadable(lazy(() => import('pages/my-topics/products')));
const OpenTopicDetailPage = Loadable(lazy(() => import('pages/private_pages/open-topic-detail')));

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
          element: <DashboardPage />
        },
        {
          path: '/products',
          element: <ProductsPage />
        },
        {
          path: '/my-proposals',
          element: <MyProposalsPage />,
        },
        {
          path: '/awards',
          element: <AwardsPage />,
        },
        {
          path: '/open-topics',
          element: <OpenTopicsPage />,
        },
        {
          path: '/open-topic-detail',
          title: <FormattedMessage id="Open Topic Detail" />,
          element: <OpenTopicDetailPage />,
        },
      ]
    },

  ]
};

export default MainRoutes;
