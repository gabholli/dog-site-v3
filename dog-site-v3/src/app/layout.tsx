// app/layout.tsx
import React from 'react'
import './globals.css'
import Header from './components/Header';
import Footer from './components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='grid grid-rows-[auto_1fr_auto] grid-cols-1 w-full min-h-screen'>
        <Header />
        <main className="flex items-center justify-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
