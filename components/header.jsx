"use client";

import React from "react";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  const selectedLayout = useSelectedLayoutSegment();
  const pathname = usePathname();

  // Define titles for specific pages
  const pageTitles = {
    "/": "Dashboard",
    "/operations": "All Operations Files",
    "/operations/books": "Books",
    "/operations/receipts": "Receipts",
    "/operations/money-received/view-receipt": "Operations Receipts",
    "/RMI/money-received/view-receipt": "RMI Receipts",
    "/tuition/money-received/view-receipt": "Tuition Receipts",
    "/operations/ledgers": "Ledgers",
    "/students": "Students List",
  };

  // Get the title based on the pathname
  const title = pageTitles[pathname] || "Page Not Found";

  // Hide Header on sign-in and sign-up pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }

  return (
    <div
      className={
        `sticky inset-x-0 top-0 z-30 w-full flex0 justify-between transition-all border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/60` +
        (selectedLayout ? " bg-background" : "")
      }
    >
      <div className="flex h-[47px] items-center justify-center px-4 relative">
        <div className="absolute left-4">
          <SidebarTrigger />
        </div>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default Header;
