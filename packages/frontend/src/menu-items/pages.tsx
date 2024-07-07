// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DollarOutlined, LoginOutlined, PhoneOutlined, RocketOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { DollarOutlined, LoginOutlined, PhoneOutlined, RocketOutlined };

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
      icon: icons.DollarOutlined
    },
    {
      id: 'my-topics',
      title: <FormattedMessage id="My Topics" />,
      type: 'item',
      url: '/my-topics',
      icon: icons.LoginOutlined
    },
    {
      id: 'open-topics',
      title: <FormattedMessage id="Open Topics" />,
      type: 'item',
      url: '/open-topics',
      icon: icons.PhoneOutlined
    }
  ]
};

export default pages;
