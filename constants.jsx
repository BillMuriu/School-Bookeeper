import { Icon } from '@iconify/react';
import Home, { HomeIcon } from '@radix-ui/react-icons'

export const SIDENAV_ITEMS = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon width="20" height="20" />,
  },
  {
    title: 'Operations',
    path: '/operations',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'All Operation Files', path: '/operations' },
      { title: 'Payment Vouchers', path: '/operations/payment-vouchers' },
      { title: 'Petty Cash', path: '/operations/petty-cash' },
    ],
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Privacy', path: '/settings/privacy' },
    ],
  },
  {
    title: 'Help',
    path: '/help',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  
];
