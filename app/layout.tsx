import type {Metadata} from 'next';
import { Inter, Blinker } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const blinker = Blinker({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  variable: '--font-blinker',
});

export const metadata: Metadata = {
  title: 'Prosper Nexus',
  description: 'Quote Configuration & Orchestration system',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${blinker.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
