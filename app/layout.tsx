import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const siteTitle = 'Verqora | Digital Solutions';
const siteDescription = 'Modern IT solutions for business growth.';
const siteUrl = 'https://verqora-solutions.example.com';
const siteImagePath = '/api/og-image';
const siteImage = `${siteUrl}${siteImagePath}`;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Verqora',
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: 'Verqora Dynamic Open Graph Image',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    creator: '@verqora',
    images: [siteImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-950 text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
