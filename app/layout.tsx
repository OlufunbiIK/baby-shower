import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Baby Shower - Adebukola Ayeni Jolayemi",
  description: "Join us in celebrating the arrival of our little blessing",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
