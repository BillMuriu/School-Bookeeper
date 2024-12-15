"use client";

import React from "react";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { useHeaderContext } from "../contexts/header-context";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  const selectedLayout = useSelectedLayoutSegment();
  const { handleOpen } = useHeaderContext();
  const pathname = usePathname();

  // Hide Header on sign-in and sign-up pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }

  return (
    <div
      className={
        `sticky inset-x-0 top-0 z-30 w-full flex0 justify-end transition-all border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/60` +
        (selectedLayout ? " bg-background" : "")
      }
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex-shrink-0">
          <SidebarTrigger />
        </div>
        <div className="flex flex-row items-center gap-2"></div>
      </div>
    </div>
  );
};

export default Header;
