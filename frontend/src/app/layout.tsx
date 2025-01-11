import type { Metadata } from "next";
import { Bitter, Noto_Sans } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto",
});

const bitter = Bitter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bitter",
});

export const metadata: Metadata = {
  title: "NPI - checklist",
  description: "Checklist for NPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-noto ${noto.variable} ${bitter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
