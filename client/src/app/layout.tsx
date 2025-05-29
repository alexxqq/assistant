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
  title: "Tavnix AI — Advanced Contextual AI Chat Assistant",
  description:
    "Tavnix AI delivers cutting-edge contextual AI chat experiences using RAG technology. Upload documents, get intelligent responses, and enhance your productivity with seamless conversations.",
  keywords: [
    "Tavnix AI",
    "contextual AI chat",
    "RAG AI assistant",
    "intelligent chatbot",
    "AI document understanding",
    "vector search AI",
    "natural language processing",
    "productivity AI",
    "AI chat assistant",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tavnix AI — Advanced Contextual AI Chat Assistant",
    description:
      "Discover Tavnix AI, the next-generation AI chat assistant with powerful document understanding and contextual awareness powered by RAG and vector search.",
    type: "website",
    url: "https://detect.uno",
    images: [
      {
        url: "https://detect.uno/logo.png",
        width: 1200,
        height: 630,
        alt: "Tavnix AI Logo",
      },
    ],
    siteName: "Tavnix AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tavnix AI — Advanced Contextual AI Chat Assistant",
    description:
      "Experience smarter conversations with Tavnix AI. Upload documents, leverage vector search and RAG for context-aware AI chat.",
    images: ["https://detect.uno/logo.png"],
    site: "@TavnixAI",
  },
  alternates: {
    canonical: "https://detect.uno",
  },
  other: {
    "application-name": "Tavnix AI",
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
              name: "Tavnix AI",
              url: "https://detect.uno/",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Web",
              description:
                "Tavnix AI is an advanced AI chat assistant leveraging Retrieval-Augmented Generation (RAG) and vector search to provide context-rich, intelligent conversations and document understanding.",
              provider: {
                "@type": "Organization",
                name: "Tavnix AI",
                url: "https://detect.uno/",
              },
              featureList: [
                "Retrieval-Augmented Generation (RAG) technology",
                "Contextual document analysis",
                "Fast vector similarity search",
                "Natural language understanding",
                "Secure and seamless user experience",
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
