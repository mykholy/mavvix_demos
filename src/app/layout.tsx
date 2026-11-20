import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Mavvix Demo Factory V2 — Commercial Concept Websites',
  description: 'Production-grade showcase of 8 bespoke commercial websites with relational SQLite persistence and protected CMS Studio.',
  icons: {
    icon: '/assets/mavvix/favicon.ico',
    apple: '/assets/mavvix/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

