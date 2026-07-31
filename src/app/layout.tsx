import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "myGlossary",
  description: "Glosssary of the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
  className={`
    ${geistSans.variable}
    ${geistMono.variable}
    flex min-h-screen flex-col
  `}
>
  <Header />
  
  <div className="flex-1">
    {children}
  </div>

  <Footer
    version={siteConfig.version}
    githubUrl={siteConfig.githubUrl}
    linkedinUrl={siteConfig.linkedinUrl}
    contactEmail={siteConfig.contactEmail}
  />
</body>
    </html>
  );
}
