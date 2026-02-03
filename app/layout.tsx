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
  title: "Baby Shower Celebration - Adebukola Ayeni Jolayemi | March 28, 2026",
  description: "Join us in celebrating the upcoming arrival of our precious little blessing! You're warmly invited to Adebukola's baby shower on Saturday, March 14th, 2026, from 3:00-7:00 PM CTGMT. RSVP today to be part of this joyful celebration! 🎉✨👶",
  
  keywords: ["baby shower", "Adebukola Ayeni Jolayemi", "baby celebration", "March 2026", "baby shower invitation", "RSVP"],
  
  authors: [{ name: "Adebukola Ayeni Jolayemi" }],
  
  openGraph: {
    title: "Baby Shower Celebration 🎉 - Adebukola Ayeni Jolayemi",
    description: "You're warmly invited to celebrate our little blessing! Join us for Adebukola's baby shower on March 14th, 2026, 3:00-7:00 PM CTGMT. Click to RSVP and view event details! 🎉✨👶",
    url: "https://baby-shower-henna.vercel.app",
    siteName: "Baby Shower Invitation",
    images: [
      {
        url: "https://baby-shower-henna.vercel.app/opengraph-image", // Full URL
        width: 1200,
        height: 630,
        alt: "Baby Shower Invitation for Adebukola Ayeni Jolayemi - March 14th, 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Baby Shower Celebration 🎉 - Adebukola Ayeni Jolayemi",
    description: "You're invited! Join us for Adebukola's baby shower on March 14th, 2026, 3:00-7:00 PM CTGMT. RSVP today to celebrate our little blessing! 🎉✨👶",
    images: ["https://baby-shower-henna.vercel.app/opengraph-image"], // Full URL
  },
  
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
<meta property="og:image:height" content="630" /> 
        <meta name="theme-color" content="#1a4d2e" />
      </head>
      <body className={`${playfair.variable} ${montserrat.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}