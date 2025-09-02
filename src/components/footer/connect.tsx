import { getIcon } from '@/lib/icons';
import Link from 'next/link';

const connectLinks = [
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

export default function Connect() {
  return (
    <div className="flex flex-col items-center md:items-start gap-3">
      <div className="flex justify-center w-full">
        <p className="text-muted-foreground text-sm">Connect</p>
      </div>
      <nav className="grid grid-cols-2 gap-4">
        {connectLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm transition-colors text-center justify-center md:justify-normal md:text-left custom-cursor hover:text-primary hover:underline"
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
