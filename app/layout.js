"use client";
import { ThemeProviderNext } from "@/contexts/theme-provider";
import { HeaderProvider } from "@/contexts/header-context";
import QueryProvider from "@/contexts/query-provider";
import { createTheme, ThemeProvider } from "@mui/material";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import { HeaderMobile } from "@/components/header-mobile";
import SideNav from "@/components/side-nav";
import PageWrapper from "@/components/page-wrapper";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import { Toaster } from "@/components/ui/sonner";
import { grey } from "@mui/material/colors";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: grey[800],
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProviderNext
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeProvider theme={theme}>
            <QueryProvider>
              <HeaderProvider>
                <div className="flex">
                  <SideNav />
                  <main className="flex-1">
                    <MarginWidthWrapper>
                      <Header />
                      <HeaderMobile />
                      <PageWrapper>{children}</PageWrapper>
                    </MarginWidthWrapper>
                  </main>
                  <Toaster />
                </div>
              </HeaderProvider>
            </QueryProvider>
          </ThemeProvider>
        </ThemeProviderNext>
      </body>
    </html>
  );
}
