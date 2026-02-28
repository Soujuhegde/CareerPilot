import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareerPilot - Your AI Career Coach",
  description: "Your AI Career Coach for Smarter Growth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased selection:bg-[#FFD400] selection:text-black relative`}
      >
        {children}
      </body>
    </html>
  );
}
