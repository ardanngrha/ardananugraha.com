import type { Metadata } from "next";
import "./globals.css";
import { Inter, Zeyada, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const zeyada = Zeyada({
  weight: '400',
  subsets: ["latin"],
  display: "swap",
  variable: '--font-zeyada'
});
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ["latin"],
  display: "swap",
  variable: '--font-space-mono'
});

export const metadata: Metadata = {
  title: "Ardana Nugraha",
  description: "Personal website of Ardana Nugraha, a software engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${inter.className} ${zeyada.variable} ${spaceMono.variable} max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}