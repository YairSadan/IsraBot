import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Navbar from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IsraBot",
  description: "A chatbot who will stand by you with the most stupid people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Analytics />
            <Toaster />
            <SonnerToaster position="bottom-left" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
