import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SHUTR LAB — Canon tethering for macOS",
  description:
    "Native macOS tethering app for Canon EOS cameras. Real USB tether, recital folder workflow, full exposure controls.",
  openGraph: {
    title: "SHUTR LAB",
    description: "Native macOS tethering app for Canon EOS cameras.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#10DD5C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
