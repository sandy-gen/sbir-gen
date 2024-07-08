// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  DashboardOutlined,
  FileOutlined,
  FolderOpenOutlined,
  TrophyOutlined
} from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { DashboardOutlined, FileOutlined, FolderOpenOutlined, TrophyOutlined };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  // title: <FormattedMessage id="pages" />,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="Dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined
    },
    {
      id: 'open-topics',
      title: <FormattedMessage id="Open Topics" />,
      type: 'item',
      url: '/open-topics',
      icon: icons.FolderOpenOutlined
    },
    {
      id: 'open-topic-detail',
      title: <FormattedMessage id="Open Topic Detail" />,
      type: 'item',
      url: '/open-topic-detail',
      icon: icons.FolderOpenOutlined,
    },
    {
      id: 'my-proposals',
      title: <FormattedMessage id="My Proposals" />,
      type: 'item',
      url: '/my-proposals',
      icon: icons.FileOutlined
    },

    {
      id: 'awards',
      title: <FormattedMessage id="Awards" />,
      type: 'item',
      url: '/awards',
      icon: icons.TrophyOutlined
    }
  ]
};

export default pages;
