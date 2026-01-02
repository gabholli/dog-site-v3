// app/layout.tsx
import React from 'react'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import AuthContextProvider from './context/AuthContext'
import BackToTopButton from './components/backToTopButton'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <title>Dog Information</title>
      <link rel="shortcut icon" type="image/x-icon" href="/Boxer Puppy1.ico" />
      <body className='font-garamond grid grid-rows-[auto_1fr_auto] grid-cols-1 w-full min-h-svh'>
        <AuthContextProvider>
          <Header />
          <main className="flex items-center justify-center">{children}</main>
          <Footer />
          <Toaster
            position="bottom-left"
            reverseOrder={false}
          />
          <BackToTopButton />
        </AuthContextProvider>
      </body>
    </html>
  );
}
