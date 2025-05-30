import type {Metadata} from "next";
import {Geist, Geist_Mono, Open_Sans} from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/features/auth/context/AuthContext";
import NavBar from "@/components/NavBar/NavBar";
import {ThemeProvider} from "@/components/theme/theme-provider";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Quick Book",
  description: "Create and manage reservations for your business within minutes!",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en supressHydrationWarning">
    <body
      className={` ${openSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased w-full bg-background`}
    >
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <NavBar/>
        {children}
      </AuthProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
