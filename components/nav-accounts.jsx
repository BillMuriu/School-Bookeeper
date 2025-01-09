"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MoreHorizontal, PlusCircle, BookOpen, FolderOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  const pathname = usePathname();
  const [activeAccount, setActiveAccount] = useState(null);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Accounts</SidebarGroupLabel>
      <SidebarMenu>
        {accounts?.map((account) => {
          const isActive = activeAccount === account.title;

          return (
            <SidebarMenuItem key={account.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                onClick={() => setActiveAccount(account.title)}
              >
                <div>
                  <account.icon />
                  <span>{account.title}</span>
                </div>
              </SidebarMenuButton>
              <DropdownMenu
                open={activeAccount === account.title}
                onOpenChange={(isOpen) => {
                  if (isOpen) {
                    setActiveAccount(account.title);
                  } else {
                    setActiveAccount(null);
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
                  className="w-48 rounded-lg border border-border bg-background shadow-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  {/* Main Link for All Files */}
                  <DropdownMenuItem>
                    <SidebarMenuButton asChild>
                      <a
                        href={account.url}
                        className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <FolderOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">All Files</span>
                      </a>
                    </SidebarMenuButton>
                  </DropdownMenuItem>
                  {/* Custom Separator with Title */}

                  {/* Custom Separator for Additional Items */}
                  <div className="relative flex items-center py-1">
                    <span className="absolute mt-4 mb-3 inset-x-0 flex justify-center bg-background px-2 text-[12px] text-muted-foreground">
                      Quick Adds
                    </span>
                    <hr className="w-full border-border" />
                  </div>

                  {account.items.map((item) => (
                    <DropdownMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <PlusCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </DropdownMenuItem>
                  ))}
                  <div className="relative flex items-center py-2">
                    <span className="absolute inset-x-0 mt-4 flex justify-center bg-background px-1 text-[12px] text-muted-foreground">
                      Books
                    </span>
                    <hr className="w-full border-border" />
                  </div>
                  {/* Additional Links for Account Books */}
                  <DropdownMenuItem>
                    <SidebarMenuButton asChild>
                      <a
                        href={`${account.url}/cashbook`}
                        className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Cashbook</span>
                      </a>
                    </SidebarMenuButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SidebarMenuButton asChild>
                      <a
                        href={`${account.url}/ledger`}
                        className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Ledger</span>
                      </a>
                    </SidebarMenuButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SidebarMenuButton asChild>
                      <a
                        href={`${account.url}/trial-balance`}
                        className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">
                          Trial Balance
                        </span>
                      </a>
                    </SidebarMenuButton>
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
