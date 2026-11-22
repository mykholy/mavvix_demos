import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const viewport: Viewport = {
  themeColor: '#08132D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: { default: 'Mavvix | Digital Experiences & Commercial Platform Factory', template: '%s | Mavvix' },
  description: 'Enterprise digital experiences and commercial web platforms built by Mavvix Software.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
  icons: { icon: '/assets/mavvix/favicon.ico', apple: '/assets/mavvix/apple-touch-icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-arabic">{children}</body>
    </html>
  );
}
