import { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4 first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-bold tracking-tight mt-8 mb-4 pb-2 border-b border-border" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-semibold tracking-tight mt-6 mb-3" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-lg font-semibold tracking-tight mt-4 mb-2" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="text-base leading-7 mb-4 text-foreground" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-4 space-y-2 list-disc list-inside" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-4 space-y-2 list-decimal list-inside" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-base leading-7 text-foreground ml-4" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/50 italic rounded-r-lg" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono text-foreground" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={`${className} text-sm`} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto text-sm my-6 font-mono" {...props}>
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }: { src?: string; alt?: string }) => {
    if (!src) return null;

    return (
      <div className="my-6">
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={400}
          className="rounded-lg shadow-lg border border-border w-full h-auto"
          {...props}
        />
      </div>
    );
  },
  a: ({ children, href, ...props }) => {
    if (!href) return <span>{children}</span>;

    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <a
          href={href}
          className="text-primary no-underline hover:underline font-medium transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className="text-primary no-underline hover:underline font-medium transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border border-border rounded-lg overflow-hidden" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="font-semibold text-left p-3 border-b border-border text-foreground" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="p-3 border-b border-border/50 text-foreground" {...props}>
      {children}
    </td>
  ),
  hr: ({ ...props }) => (
    <hr className="border-border my-8" {...props} />
  ),
};