"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import MenuList from "./menu-list";
import AccountsMenuList from "./accounts-menu-list";
import StudentMenuList from "./students-menu-list";
import ExtrasMenuList from "./extras-menu-list";

const SideNav = () => {
  const pathname = usePathname();

  // Make SideNav invisible on the /sign-in page
  if (pathname === "/sign-in") {
    return null;
  }

  return (
    <div className="md:w-60 bg-background h-screen flex-1 fixed border-r border-border hidden md:flex">
      <ScrollArea className="border-t-[1px] border-border mt-[47px] mx-[10px] w-full">
        <MenuList className="py-0" pathname={pathname} />
        <AccountsMenuList className="py-0" pathname={pathname} />
        <StudentMenuList className="py-0" pathname={pathname} />
        <ExtrasMenuList className="py-0" pathname={pathname} />
      </ScrollArea>
    </div>
  );
};

export default SideNav;
