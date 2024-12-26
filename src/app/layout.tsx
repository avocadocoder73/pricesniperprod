import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SatoshiMed = localFont({
  src: "./fonts/Satoshi-Medium.woff",
  variable: "--font-satoshi-med",
  weight: "100 900",
})

const SatoshiBold = localFont({
  src: "./fonts/Satoshi-Bold.woff",
  variable: "--font-satoshi-bold",
  weight: "100 900",
})


export const metadata: Metadata = {
  title: "PandaLookup",
  description: "Find the best prices on TikTok Shop products across the web. PandaLookup helps you compare prices and save money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" className="h-full">
        <body>
        {children}
        </body>
    </html>
    
  );
}
