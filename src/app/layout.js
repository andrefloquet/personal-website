import { Inter } from "next/font/google";

import Header from '@/components/header';
import Footer from '@/components/footer';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Andre Floquet Website",
  description: "This is my personal website. Enjoy it :)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
