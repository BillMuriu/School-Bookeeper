"use client";

import React from "react";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useHeaderContext } from "../contexts/header-context";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  const selectedLayout = useSelectedLayoutSegment();
  const { handleOpen } = useHeaderContext();
  const pathname = usePathname();

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
        <div className="flex flex-row items-center gap-2">
          {/* <div className="h-8 w-8 rounded-full border-b-border flex items-center justify-center text-center">
            <span className="font-semibold text-sm">HQ</span>
          </div> */}
          {/* <ModeToggle /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
