"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MoreHorizontal, PlusCircle } from "lucide-react";
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
                    className="transition-all duration-100 ease-in-out hover:border hover:border-primary hover:shadow-lg"
                  >
                    <MoreHorizontal className="h-100 w-5" />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-54 rounded-lg border border-border bg-background shadow-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <h3 className="px-3 py-2 text-sm font-semibold text-muted-foreground">
                    {student.title}
                  </h3>
                  <DropdownMenuSeparator />
                  {student.items.map((item) => (
                    <DropdownMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {/* Circle Plus icon added here */}
                          <PlusCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
