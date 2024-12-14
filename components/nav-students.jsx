"use client";
import { usePathname } from "next/navigation";
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

export function NavStudents({ students }) {
  const { isMobile } = useSidebar();
  const pathname = usePathname(); // Get the current pathname
  const [activeAccount, setActiveAccount] = useState(null); // Track the active account

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Students</SidebarGroupLabel>
      <SidebarMenu>
        {students?.map((student) => {
          // Determine if the current account is active
          const isActive = activeAccount === student.title;

          return (
            <SidebarMenuItem key={student.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive} // Active if it's the current URL or active account
                onClick={() => setActiveAccount(student.title)} // Set active account on click
              >
                <a href={student.url}>
                  <student.icon />
                  <span>{student.title}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu
                open={activeAccount === student.title} // Open if this account is active
                onOpenChange={(isOpen) => {
                  if (isOpen) {
                    setActiveAccount(student.title); // Set active when opened
                  } else {
                    setActiveAccount(null); // Reset active account when closed
                  }
                }}
              >
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="transition-all duration-300 ease-in-out hover:rotate-12 hover:text-primary hover:shadow-lg"
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
                  <h1>{student.title}</h1>
                  <DropdownMenuSeparator />
                  {student.items.map((item) => (
                    <DropdownMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <student.icon />
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
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
