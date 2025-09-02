import { getIcon } from '@/lib/icons';

export const navigationTabs = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    logo: getIcon('HomeOutlined', 'w-5 h-5'),
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    logo: getIcon('Briefcase', 'w-5 h-5'),
  },
  {
    id: 'writings',
    label: 'Writings',
    href: '/writings',
    logo: getIcon('PencilAlt', 'w-5 h-5'),
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    logo: getIcon('UserOutlined', 'w-5 h-5'),
  },
  {
    id: 'more',
    label: 'More',
    href: '#',
    logo: getIcon('ChevronDownOutlined', 'w-5 h-5'),
    isDropdown: true,
  },
];

export const dropdownItems = [
  {
    id: 'guestbook',
    label: 'Guest Book',
    description: 'Leave a message or sign my guest book',
    href: '/guestbook',
    icon: getIcon('BookOpen', 'w-4 h-4'),
  },
  {
    id: 'credits',
    label: 'Credits',
    description: 'Acknowledgments and attributions',
    href: '/credits',
    icon: getIcon('InformationCircle', 'w-4 h-4'),
  },
];
