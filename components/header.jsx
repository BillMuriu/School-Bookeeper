"use client";

import React from "react";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  const selectedLayout = useSelectedLayoutSegment();
  const pathname = usePathname();

  // Titles for specific pages
  const pageTitles = {
    "/": "Dashboard",
    "/operations": "All Operations Files",
    "/operations/books": "Books",
    "/operations/receipts": "Receipts",
    "/operations/money-received/add-receipt": "Operations - Add Receipt",

    "/operations/payment-vouchers": "Operations All Payments",
    "/operations/payment-vouchers/add-paymentvoucher":
      "Operations - Add Payment",

    "/operations/petty-cash": "Operations All PettyCashs",
    "/operations/petty-cash/add-pettycash": "Operations - Add PettyCash",

    "/operations/bank-charges": "Operations All BankCharges",
    "/operations/bank-charges/add-bankcharge": "Operations - Add BankCharge",

    "/RMI/money-received/view-receipt": "RMI Receipts",
    "/tuition/money-received/view-receipt": "Tuition Receipts",
    "/operations/ledgers": "Ledgers",
    "/students": "Students List",
  };

  // Dynamic title matching
  let title = pageTitles[pathname] || "Page Not Found";

  // Handle dynamic routes
  const dynamicRoutes = [
    {
      pattern: /^\/operations\/money-received\/view-receipt\/(\d+)$/,
      getTitle: (id) => `Operations - Receipt #${id}`,
    },
    {
      pattern: /^\/operations\/payment-vouchers\/view-paymentvoucher\/(\d+)$/,
      getTitle: (id) => `Operation - PaymentVoucher #${id}`,
    },
    {
      pattern: /^\/operations\/petty-cash\/view-pettycash\/(\d+)$/,
      getTitle: (id) => `Operations - PettyCash #${id}`,
    },
  ];

  for (const route of dynamicRoutes) {
    const match = pathname.match(route.pattern);
    if (match) {
      title = route.getTitle(match[1]);
      break;
    }
  }

  // Hide Header on sign-in and sign-up pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }

  return (
    <div
      className={
        `sticky inset-x-0 top-0 z-30 w-full flex0 justify-between transition-all border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/60` +
        (selectedLayout ? " bg-background" : "")
      }
    >
      <div className="flex h-[47px] items-center justify-center px-4 relative">
        <div className="absolute left-4">
          <SidebarTrigger />
        </div>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default Header;
