import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "3VI - Consulenza Climatizzazione Milano | Risparmia fino al 30% sulla Bolletta",
  description: "Consulenza gratuita e sopralluogo professionale per climatizzatori a Milano Sud. Rivenditori ufficiali Daikin, LG e Idema. Preventivo chiavi in mano in 48 ore.",
  keywords: "climatizzatori Milano, consulenza climatizzazione, Daikin Milano, LG climatizzatori, Idema, risparmio energetico, detrazioni fiscali",
  authors: [{ name: "3VI S.r.l." }],
  creator: "3VI S.r.l.",
  publisher: "3VI S.r.l.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://3vi-climatizzazione.it"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "3VI - Consulenza Climatizzazione Milano | Risparmia fino al 30% sulla Bolletta",
    description: "Consulenza gratuita e sopralluogo professionale per climatizzatori a Milano Sud. Rivenditori ufficiali Daikin, LG e Idema.",
    url: "https://3vi-climatizzazione.it",
    siteName: "3VI Climatizzazione",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3VI - Consulenza Climatizzazione Milano",
    description: "Consulenza gratuita e sopralluogo professionale per climatizzatori a Milano Sud.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="font-sans antialiased">
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1169131537876464');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1169131537876464&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
