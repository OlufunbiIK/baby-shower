import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: "Baby Shower - Adebukola Ayeni Jolayemi | March 28, 2026",
  description: "Join us in celebrating the upcoming arrival of our little blessing! Baby shower for Adebukola on Saturday, March 28th, 2026, 1:30-4:30 PM CTGMT. RSVP today! 🎉✨",
  
  keywords: ["baby shower", "Adebukola Ayeni Jolayemi", "baby celebration", "March 2026", "baby shower invitation"],
  
  authors: [{ name: "Adebukola Ayeni Jolayemi" }],
  
  // Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "Baby Shower - Adebukola Ayeni Jolayemi 🎉",
    description: "You're invited! Join us for a joyful baby shower celebration. March 28, 2026 | 1:30-4:30 PM CTGMT",
    url: "https://baby-shower-henna.vercel.app/", 
    siteName: "Baby Shower Invitation",
    images: [
      {
        url: "/Adebukola-Ayeni-Jolayemi.png", // Your invitation image
        width: 1200,
        height: 1600,
        alt: "Baby Shower Invitation for Adebukola Ayeni Jolayemi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Baby Shower - Adebukola Ayeni Jolayemi 🎉",
    description: "Join us for a joyful baby shower celebration! March 28, 2026",
    images: ["/Adebukola-Ayeni-Jolayemi.png"],
  },
  
  // Additional meta tags
  robots: {
    index: true,
    follow: true,
  },
  
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags for better preview */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1600" />
        <meta name="theme-color" content="#1a4d2e" />
      </head>
      <body className={`${playfair.variable} ${montserrat.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}