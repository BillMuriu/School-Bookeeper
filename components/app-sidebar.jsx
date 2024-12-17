"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ClipboardIcon,
  CardStackIcon,
  BackpackIcon,
} from "@radix-ui/react-icons";
import { Frame, GalleryVerticalEnd } from "lucide-react";
import { GenericNav } from "./generic-nav";
import { NavAccounts } from "./nav-accounts";
import { NavStudents } from "./nav-students";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Ciagini",
      logo: GalleryVerticalEnd,
      plan: "Secondary",
    },
  ],
  accounts: [
    {
      title: "Operations",
      url: "/operations",
      icon: ClipboardIcon,
      items: [
        { title: "Add Receipt", url: "/operations" },
        { title: "Add Petty-Cash", url: "/operations/payment-vouchers" },
        { title: "Add Payment-Voucher", url: "/operations/petty-cash" },
        { title: "Add Bank-Charge", url: "/operations/petty-cash" },
      ],
    },
    {
      title: "RMI",
      url: "/rmi",
      icon: CardStackIcon,
      items: [
        { title: "Add Receipt", url: "/rmi" },
        { title: "Add Petty-Cash", url: "/rmi/payment-vouchers" },
        { title: "Add Payment-Voucher", url: "/rmi/petty-cash" },
        { title: "Add Bank-Charge", url: "/rmi/petty-cash" },
      ],
    },
    {
      title: "Tuition",
      url: "/tuition",
      icon: BackpackIcon,
      items: [
        { title: "Add Receipt", url: "/tuition" },
        { title: "Add Petty-Cash", url: "/tuition/payment-vouchers" },
        { title: "Add Payment-Voucher", url: "/tuition/petty-cash" },
        { title: "Add Bank-Charge", url: "/tuition/petty-cash" },
      ],
    },
    {
      title: "School Fund",
      url: "/school-fund",
      icon: HomeIcon,
      items: [
        { title: "Add Receipt", url: "/school-fund" },
        {
          title: "Add Petty-Cash",
          url: "/school-fund/payment-vouchers",
        },
        {
          title: "Add Payment-Voucher",
          url: "/school-fund/petty-cash",
        },
        {
          title: "Add Bank-Charge",
          url: "/school-fund/petty-cash",
        },
      ],
    },
  ],
  students: [
    {
      title: "Students",
      url: "/students",
      icon: HomeIcon,
      items: [
        { title: "All students", url: "/students" },
        { title: "Opening balances", url: "/students/opening-balances" },
      ],
    },
  ],

  projects: [
    {
      name: "Dashboard",
      url: "#",
      icon: Frame,
    },
  ],
};

export function AppSidebar(props) {
  const pathname = usePathname(); // Get the current path

  // Hide sidebar on sign-in and sign-up pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <GenericNav projects={data.projects} />
        <NavAccounts accounts={data.accounts} />
        <NavStudents students={data.students} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
