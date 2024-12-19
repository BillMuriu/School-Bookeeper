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
      url: "/operations/money-received/view-receipt",
      icon: ClipboardIcon,
      items: [
        { title: "Add Receipt", url: "/operations/money-received/add-receipt" },
        {
          title: "Add Petty-Cash",
          url: "/operations/petty-cash/add-pettycash",
        },
        {
          title: "Add Payment-Voucher",
          url: "/operations/payment-vouchers/add-paymentvoucher",
        },
        {
          title: "Add Bank-Charge",
          url: "/operations/bank-charges/add-bankcharge",
        },
      ],
    },
    {
      title: "RMI",
      url: "/rmi",
      icon: CardStackIcon,
      items: [
        { title: "Add Receipt", url: "/RMI/money-received/add-receipt" },
        { title: "Add Petty-Cash", url: "/RMI/petty-cash/add-pettycash" },
        {
          title: "Add Payment-Voucher",
          url: "/RMI/payment-vouchers/add-paymentvoucher",
        },
        { title: "Add Bank-Charge", url: "/RMI/bank-charges/add-bankcharge" },
      ],
    },
    {
      title: "Tuition",
      url: "/tuition",
      icon: BackpackIcon,
      items: [
        { title: "Add Receipt", url: "/tuition/money-received/add-receipt" },
        { title: "Add Petty-Cash", url: "/tuition/petty-cash/add-pettycash" },
        {
          title: "Add Payment-Voucher",
          url: "/tuition/payment-vouchers/add-paymentvoucher",
        },
        {
          title: "Add Bank-Charge",
          url: "/tuition/bank-charges/add-bankcharge",
        },
      ],
    },
    {
      title: "School Fund",
      url: "/school-fund",
      icon: HomeIcon,
      items: [
        {
          title: "Add Petty-Cash",
          url: "/school-fund/petty-cash/add-pettycash",
        },
        {
          title: "Add Payment-Voucher",
          url: "/school-fund/payment-vouchers/add-paymentvoucher",
        },
        {
          title: "Add Bank-Charge",
          url: "/school-fund/bank-charges/add-bankcharge",
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
        {
          title: "Create Student's Receipt",
          url: "/students",
        },
        {
          title: "Add Student",
          url: "/students/add-student",
        },
      ],
    },
  ],

  projects: [
    {
      name: "Dashboard",
      url: "/",
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
