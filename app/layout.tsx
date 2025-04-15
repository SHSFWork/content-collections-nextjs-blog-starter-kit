import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ThemeSwitcher from "@/components/theme-switcher";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog",
  description: "A simple blog built with Next.js and Content Collections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <header className="px-4 py-8 border-b border-dashed">
            <div className="container mx-auto max-w-4xl flex items-center justify-between">
              <Link
                className="flex items-center gap-2 text-xl font-semibold"
                href="/"
              >
                SHSF Work
              </Link>
              <ThemeSwitcher />
            </div>
          </header>
          <main className="container mx-auto max-w-4xl px-4 py-16">
            {children}
          </main>
          <footer className="px-4 py-8 border-t border-dashed">
            <div className="container mx-auto max-w-4xl flex place-items-center justify-between text-sm">
              <p>Developed by Ozan.</p>
              <p>&copy; 2025-present. All rights reserved.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
