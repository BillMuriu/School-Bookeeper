"use client";
import { ThemeProviderNext } from "@/contexts/theme-provider";
import { HeaderProvider } from "@/contexts/header-context";
import QueryProvider from "@/contexts/query-provider";
import { createTheme, ThemeProvider } from "@mui/material";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import PageWrapper from "@/components/page-wrapper";
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
              <SidebarProvider>
                <HeaderProvider>
                  {/* <div className="flex"> */}
                  <AppSidebar />
                  {/* <SideNav /> */}
                  <main className="flex-1">
                    {/* <MarginWidthWrapper> */}
                    <Header />
                    <PageWrapper>{children}</PageWrapper>
                    {/* </MarginWidthWrapper> */}
                  </main>
                  <Toaster />
                </HeaderProvider>
              </SidebarProvider>
            </QueryProvider>
          </ThemeProvider>
        </ThemeProviderNext>
      </body>
    </html>
  );
}
