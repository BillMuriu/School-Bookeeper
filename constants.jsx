import { Icon } from "@iconify/react";
import { HomeIcon } from "@radix-ui/react-icons";

export const SIDENAV_ITEMS = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon width="20" height="20" />,
  },
  {
    title: "Operations",
    path: "/operations",
    icon: <HomeIcon width="20" height="20" />,
    submenu: true,
    subMenuItems: [
      { title: "All Operation Files", path: "/operations" },
      { title: "Payment Vouchers", path: "/operations/payment-vouchers" },
      { title: "Petty Cash", path: "/operations/petty-cash" },
    ],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <HomeIcon width="20" height="20" />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
];
