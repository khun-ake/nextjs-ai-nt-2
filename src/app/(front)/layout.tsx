import { Suspense } from "react";
import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import "../globals.css";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: "ระบบ E-Commerce COSCI",
  description: "เรียนรู้การเขียน Nex.tjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(dmSans.className, "font-sans", dmSans.variable, jetbrainsMono.variable)}
    >
      <body className="dark">
        <Suspense fallback={<div className="h-16 border-b bg-background" />}>
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
