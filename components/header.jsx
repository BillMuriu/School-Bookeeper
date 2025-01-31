"use client";

import React from "react";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { SidebarTrigger } from "./ui/sidebar";
import { pageTitles, dynamicRoutes } from "@/utils/pageTitles";

const Header = () => {
  const selectedLayout = useSelectedLayoutSegment();
  const pathname = usePathname();

  let title = pageTitles[pathname] || "Page Not Found";

  for (const route of dynamicRoutes) {
    const match = pathname.match(route.pattern);
    if (match) {
      title = route.getTitle(match[1]);
      break;
    }
  }

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
