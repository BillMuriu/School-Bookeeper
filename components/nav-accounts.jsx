"use client";
import React, { useState } from "react";
import {
  ClipboardIcon,
  CardStackIcon,
  BackpackIcon,
  HomeIcon,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavAccounts({ accounts }) {
  const { isMobile } = useSidebar();
  const [openMenu, setOpenMenu] = useState(null); // Track the open menu

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Accounts</SidebarGroupLabel>
      <SidebarMenu>
        {accounts.map((account) => (
          <SidebarMenuItem key={account.title}>
            <SidebarMenuButton asChild>
              <a href={account.url}>
                <account.icon />
                <span>{account.title}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu
              open={openMenu === account.title} // Open only if this menu is active
              onOpenChange={(isOpen) =>
                setOpenMenu(isOpen ? account.title : null)
              }
            >
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-12 hover:text-primary hover:shadow-lg"
                >
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <h1>{account.title}</h1>
                <DropdownMenuSeparator />
                {account.items.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <account.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>View Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
