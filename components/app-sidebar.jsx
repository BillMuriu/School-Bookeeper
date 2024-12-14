"use client";
import * as React from "react";
import { Icon } from "@iconify/react";
import {
  HomeIcon,
  DashboardIcon,
  ClipboardIcon,
  BookmarkIcon,
  CardStackIcon,
  BackpackIcon,
} from "@radix-ui/react-icons";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavAccounts } from "./nav-accounts";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  accounts: [
    {
      title: "Operations",
      url: "/operations",
      icon: ClipboardIcon,
      items: [
        { title: "All Operation Files", url: "/operations" },
        { title: "Payment Vouchers", url: "/operations/payment-vouchers" },
        { title: "Petty Cash", url: "/operations/petty-cash" },
      ],
    },
    {
      title: "RMI",
      url: "/rmi",
      icon: CardStackIcon,
      items: [
        { title: "All Operation Files", url: "/rmi" },
        { title: "Payment Vouchers", url: "/rmi/payment-vouchers" },
        { title: "Petty Cash", url: "/rmi/petty-cash" },
      ],
    },
    {
      title: "Tuition",
      url: "/tuition",
      icon: BackpackIcon,
      items: [
        { title: "All Operation Files", url: "/tuition" },
        { title: "Payment Vouchers", url: "/tuition/payment-vouchers" },
        { title: "Petty Cash", url: "/tuition/petty-cash" },
      ],
    },
    {
      title: "School Fund",
      url: "/school-fund",
      icon: HomeIcon,
      items: [
        { title: "All Operation Files", url: "/school-fund" },
        { title: "Payment Vouchers", url: "/school-fund/payment-vouchers" },
        { title: "Petty Cash", url: "/school-fund/petty-cash" },
      ],
    },
  ],

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.accounts} /> */}
        <NavAccounts accounts={data.accounts} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
