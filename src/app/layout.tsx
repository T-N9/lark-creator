import type { Metadata } from "next";

/* Shadcn */
import { ThemeProvider } from "@/providers/theme-provider";

/* Clerk */
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { Inter, Kaushan_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const kaushan = Kaushan_Script({ weight: '400', subsets: ["latin"], variable: "--font-kaushan" })

export const metadata: Metadata = {
  title: "Lark Creator",
  description: "All in one Agency Solution in one app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>

        <body className={`${inter.variable} ${kaushan.variable} font-sans overflow-x-hidden`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>

  );
}
