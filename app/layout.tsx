import React from 'react';
import './styles/globals.css';
import { Metadata } from 'next';
import TradeNavbar from '../components/TradeNavbar';

export const metadata: Metadata = {
  title: 'XBtc',
  description: 'App to show live stream information about traders.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-full min-h-screen">
        <header>
          <TradeNavbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
