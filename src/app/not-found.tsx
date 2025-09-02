import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="text-lg text-primary hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}
