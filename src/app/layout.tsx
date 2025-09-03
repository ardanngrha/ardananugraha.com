import type { Metadata } from 'next';
import '@/styles/global.css';
import { Inter, Space_Mono, Oooh_Baby } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from '@/components/session-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { getSession } from '@/lib/auth';
import { ScrollToTop } from '@/components/detail/scroll-to-top';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const zeyada = Oooh_Baby({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oooh-baby',
});
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-mono',
});
const tikTok = localFont({
  src: [
    {
      path: '../../public/fonts/TikTokSans-VariableFont_opsz,slnt,wdth,wght.ttf',
    },
  ],
  variable: '--font-tik-tok',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: 'Ardana Nugraha',
  description: 'Personal website of Ardana Nugraha, a software engineer.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${inter.className} ${zeyada.variable} ${spaceMono.variable} ${tikTok.variable} max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen`}
      >
        <Providers session={session}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
            <Toaster richColors />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
