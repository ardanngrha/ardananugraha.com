import Link from 'next/link';
import { connectLinks } from '@/data/footer';

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
