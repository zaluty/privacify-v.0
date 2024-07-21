import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "privacify-blue",
  description:
    "privacify-blue is a tool that helps you to analyze the terms of service of a company and return a list of the most important terms and conditions in bullet points.",
  keywords: [
    "privacify",
    "blue",
    "privacy",
    "terms",
    "service",
    "privacy policy",
    "fraud",
    "scams",
    "phishing",
    "scammer",
    "scammers",
    "protection",
    "security",
    "compliance",
    "GDPR",
    "CCPA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster richColors position="top-center" />
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
