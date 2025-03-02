import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";




export const metadata: Metadata = {
  title: "Faq",
  description: "Find the best prices on TikTok Shop products across the web. PeachyPrices helps you compare prices and save money.",
  other: {
    "impact-site-verification": "dcc698ba-e4a6-4796-8277-586c4f7a8221",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" className="min-h-screen">
      <head>
        <link rel="canonical" href="https://peachyprices.com/terms"></link>
        <meta name="google-site-verification" content="IbTW9gvpc1l8_7LTk44UnudLIO5HCYA79hHc1ale7-Y" />
        <meta name="msvalidate.01" content="DBB729304426E515E9D566D7AC6AC89B" />
        <title>Faq</title>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=G-YDY00DSFXS`} strategy="afterInteractive"/>
        <Script id="google-analytics" strategy="afterInteractive">
          {
            `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YDY00DSFXS');

            
            `
          }
        </Script>
        <Script>
          {
            `
            (function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A6050112-fc86-4a39-8c5c-0f01c0d180b71.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');
            `
          }
        </Script>
        
      </head>
        <body className="min-h-screen ">
        {children}
        </body>
    </html>
    
  );
}
