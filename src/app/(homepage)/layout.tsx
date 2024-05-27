import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { HomepageHeader } from "./components/homepage-header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const revalidate = 60; // revalidate at most every minute

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextTopLoader color="#ffed75" showSpinner={false} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <HomepageHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
