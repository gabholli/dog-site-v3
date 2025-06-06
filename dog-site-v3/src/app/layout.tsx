// app/layout.tsx
import React from 'react'
import './globals.css'
import Header from './components/Header';
import Footer from './components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <title>Dog Information</title>
      <link rel="shortcut icon" type="image/x-icon" href="/Boxer Puppy1.ico" />
      <body className='font-garamond grid grid-rows-[auto_1fr_auto] grid-cols-1 w-full min-h-svh'>
        <Header />
        <main className="flex items-center justify-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
