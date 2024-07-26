import React from 'react';
import './styles/globals.css';
import { Metadata } from 'next';
import TradeNavbar from '../components/TradeNavbar';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'XBtc',
  description: 'App to show live stream information about traders.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-full min-h-screen">
        <NextTopLoader />
        <header>
          <TradeNavbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
