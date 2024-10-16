import { Icon } from "@iconify/react";
import { HomeIcon } from "@radix-ui/react-icons";

export const SIDENAV_ITEMS = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon width="20" height="20" />,
  },
];

export const ACCOUNTS = [
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
    title: "RMI",
    path: "/rmi",
    icon: <HomeIcon width="20" height="20" />,
    submenu: true,
    subMenuItems: [
      { title: "All Operation Files", path: "/rmi" },
      { title: "Payment Vouchers", path: "/rmi/payment-vouchers" },
      { title: "Petty Cash", path: "/rmi/petty-cash" },
    ],
  },

  {
    title: "Tuition",
    path: "/tuition",
    icon: <HomeIcon width="20" height="20" />,
    submenu: true,
    subMenuItems: [
      { title: "All Operation Files", path: "/tuition" },
      { title: "Payment Vouchers", path: "/tuition/payment-vouchers" },
      { title: "Petty Cash", path: "/tuition/petty-cash" },
    ],
  },

  {
    title: "SchoolFund",
    path: "/school-fund",
    icon: <HomeIcon width="20" height="20" />,
    submenu: true,
    subMenuItems: [
      { title: "All Operation Files", path: "/school-fund" },
      { title: "Payment Vouchers", path: "/school-fund/payment-vouchers" },
      { title: "Petty Cash", path: "/school-fund/petty-cash" },
    ],
  },
];

export const STUDENTS = [
  {
    title: "Students",
    path: "/students",
    icon: <HomeIcon width="20" height="20" />,
    submenu: true,
    subMenuItems: [
      { title: "All students", path: "/students" },
      { title: "Opening balances", path: "/students/opening-balances" },
    ],
  },
];

export const EXTRAS = [
  {
    title: "Settings",
    path: "/settings",
    icon: <HomeIcon width="20" height="20" />,
  },
];
