import { getIcon } from '@/lib/icons';

export const connectLinks = [
  {
    label: 'X (Twitter)',
    href: 'https://x.com/ardanngrha',
    icon: getIcon('XTwitter', 'w-4 h-4'),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/adanngrha',
    icon: getIcon('Instagram', 'w-4 h-4'),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/ardanngrha',
    icon: getIcon('GitHub', 'w-4 h-4'),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ardana-nugraha',
    icon: getIcon('LinkedIn', 'w-4 h-4'),
  },
  {
    label: 'Email',
    href: 'mailto:contact.ardana@gmail.com',
    icon: getIcon('Email', 'w-4 h-4'),
  },
  {
    label: 'Resume',
    href: '/resume.pdf',
    icon: getIcon('Resume', 'w-4 h-4'),
  },
];

export const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Writings', href: '/writings' },
  { label: 'About', href: '/about' },
];
