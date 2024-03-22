import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Roboto } from "next/font/google";
import SessionWrapper from './components/SessionWrapper';

import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ['300'] });

export const metadata: Metadata = {
  title: "Subcasts",
  description: "Create you own blog cast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={roboto.className}>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <Toaster position="bottom-center" toastOptions={{
            // Define default options
            className: '',
            duration: 1000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 2000,

            }
          }} />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
