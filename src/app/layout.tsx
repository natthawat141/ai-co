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

export const metadata: Metadata = {
  title: "Next gen (CSI SPU)",
  description: "Empowered by seeder development [bill natthawat sawatdee , บิว ณัฐวัตร สวัสดี ]",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },  // favicon
    ],
    apple: [
      { url: "/logo.png" }  // Apple touch icon
    ]
  },
  // เพิ่ม Open Graph และ Twitter card metadata
  openGraph: {
    title: "Next gen (CSI SPU)",
    description: "Empowered by seeder development by[ bill natthawat sawatdee , บิว ณัฐวัตร สวัสดี]",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Next gen Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next gen (CSI SPU)",
    description: "Empowered by seeder development",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" /> {/* เพิ่ม favicon */}
        <link rel="apple-touch-icon" href="/logo.png" /> {/* สำหรับ iOS */}
        <meta property="og:image" content="/logo.png" /> {/* Open Graph image */}
        <meta name="twitter:image" content="/logo.png" /> {/* Twitter card image */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}