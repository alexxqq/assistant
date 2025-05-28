import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StoreProvider from "./StoreProvider";
import "./globals.css";
import { ThemeProvider } from "@/src/shared/ui/theme-provider";
import ModeHeader from "../processes/ModeHeader";
import { Toaster } from "@/src/shared/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next-Gen AI Chat with Contextual Intelligence | Try Now",
  description:
    "Experience the future of AI chat with ChatNex. Our AI offers contextual intelligence for more natural and effective conversations. Start your free trial today!",
  keywords: [
    "AI chat",
    "artificial intelligence",
    "contextual AI",
    "intelligent chatbot",
    "natural language processing",
    "conversational AI",
    "try now",
    "free trial",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Next-Gen AI Chat with Contextual Intelligence | Try Now",
    description:
      "Experience the future of AI chat with ChatNex. Our AI offers contextual intelligence for more natural and effective conversations. Start your free trial today!",
    type: "website",
    url: "https://detect.uno",
    images: [
      {
        url: "https://detect.uno/favicon.ico",
        width: 1200,
        height: 630,
        alt: "ChatNex Logo",
      },
    ],
    siteName: "ChatNex",
  },
  twitter: {
    title: "Next-Gen AI Chat with Contextual Intelligence | Try Now",
    description:
      "Experience the future of AI chat with ChatNex. Our AI offers contextual intelligence for more natural and effective conversations. Start your free trial today!",
    images: ["https://detect.uno/favicon.ico"],
  },
  alternates: {
    canonical: "https://detect.uno",
  },
  other: {
    "application-name": "ChatNex",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ChatNex",
              url: "https://detect.uno/",
              applicationCategory: "Productivity",
              operatingSystem: "Web",
              description:
                "ChatNex is a next-gen AI assistant with contextual awareness and RAG technology. Understand documents, chat smarter, and work faster.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/OnlineOnly",
              },
              provider: {
                "@type": "Organization",
                name: "ChatNex",
                url: "https://detect.uno/",
              },
              featureList: [
                "Contextual understanding",
                "Natural language processing",
                "Document upload and analysis",
                "Fast vector search",
                "Secure login",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <ModeHeader />
            {children}
          </StoreProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
