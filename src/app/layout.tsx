import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Roboto } from "next/font/google";

import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ['300'] });

export const metadata: Metadata = {
  title: "Superteam Warpcast",
  description: "Checkout superteam Frames on Warpcast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
