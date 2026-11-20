import type { Metadata } from 'next';
import '@/styles/globals.css';
export const metadata: Metadata = {
  title: { default: 'Mavvix | Digital Experiences', template: '%s | Mavvix' },
  description: 'Premium digital experiences built by Mavvix Software.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
  icons: { icon: '/assets/mavvix/favicon.ico', apple: '/assets/mavvix/apple-touch-icon.png' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar"><body className="antialiased">{children}</body></html>;
}
