import type { Metadata } from 'next';
import { Geist, Geist_Mono, Press_Start_2P } from 'next/font/google';
import './globals.css';
import Nav from '@/app/components/Nav';
import ThemeProvider from '@/app/components/ThemeProvider';
import MatrixRain from '@/app/components/MatrixRain';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const pressStart2P = Press_Start_2P({
  weight: '400',
  variable: '--font-press-start',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Jimmy — Personal Site',
    template: '%s | Jimmy',
  },
  description: 'Personal website — blog, projects, and thoughts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
          {/* Global matrix rain — fixed behind all page content */}
          <MatrixRain className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-[0.035] dark:opacity-[0.08]" />
          <Nav />
          {/* pb-8 clears the fixed 32px bottom status bar; z-10 sits above the global matrix rain */}
          <div className="relative z-10 pb-8">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
