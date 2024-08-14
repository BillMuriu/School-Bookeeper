"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import MenuList from "./menu-list";

const SideNav = () => {
  const pathname = usePathname();

  return (
    <div className="md:w-60 bg-background h-screen flex-1 fixed border-r border-border hidden md:flex">
      <ScrollArea className="border-t-[1px] border-border mt-[47px] mx-[10px] w-full">
        <MenuList className="py-16" pathname={pathname} />
      </ScrollArea>
    </div>
  );
};

export default SideNav;
