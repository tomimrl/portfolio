import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Tomás Merlonetti | Software Engineer",
  description: "Software Engineer, focused on high-performance, scalable architectures, and premium interfaces in Rosario, Argentina.",
  keywords: [
    "Tomás Merlonetti",
    "tomimrl",
    "Software Engineer",
    "Software Engineer Rosario",
    "Ingeniero de Software Rosario",
    "Software Engineer Argentina",
    "Frontend Developer",
    "Desarrollador Web Rosario",
    "Desarrollador Full Stack",
    "Desarrollador de Software",
    "Desarrollador de Software Rosario",
    "Desarrollador Rosario",
    "Developer Rosario",
    "Developer Full Stack",
    "Developer de Software",
    "Developer de Software Rosario",
    "Desarrollador React",
    "Next.js Developer Argentina",
    "Programador Frontend",
    "Programador de Software",
    "Programador de Software Rosario",
    "Programador Rosario",
    "Programador Full Stack",
    "Programador de Software",
    "Programador de Software Rosario",
  ],
  authors: [{ name: "Tomás Merlonetti" }],
  creator: "Tomás Merlonetti",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://tomimrl.vercel.app/",
    title: "Tomás Merlonetti | Software Engineer",
    description: "Web Portfolio",
    siteName: "tomimrl Portfolio",
  },
  verification: {
    google: "V4mkKt6XWirAKR-YWUF8VB1oFeDhr9xsj5bzdJDFx7A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} ${satoshi.variable} scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
