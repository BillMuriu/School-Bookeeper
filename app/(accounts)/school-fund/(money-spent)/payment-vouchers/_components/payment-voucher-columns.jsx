"use client";

import { format } from "date-fns";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "voucher_no",
    header: () => <div className="text-left">Voucher No</div>,
    cell: ({ getValue, row }) => {
      const value = getValue();
      const voucherId = row.original.id;
      return (
        <div className="flex items-center justify-start gap-2">
          <div className="text-left">{value}</div>
          <Link
            href={`/payment-vouchers/view/${voucherId}`}
            className="text-blue-500 hover:text-blue-700"
            aria-label="View Payment Voucher"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "payee_name",
    header: () => <div className="text-left">Payee Name</div>,
    cell: ({ getValue }) => {
      const rawValue = getValue();
      const formattedValue = rawValue
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      return <div className="text-left">{formattedValue}</div>;
    },
  },
  {
    accessorKey: "amount_shs",
    header: () => <div className="text-center">Amount (Shs)</div>,
    cell: ({ getValue }) => {
      const value = parseFloat(getValue()).toFixed(2);
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "payment_mode",
    header: () => <div className="text-center">Payment Mode</div>,
    cell: ({ getValue }) => {
      const value = getValue();
      const badgeClass =
        value === "bank"
          ? "border-green-500 bg-green-100 text-green-500"
          : "border-yellow-500 bg-yellow-100 text-yellow-500";
      return (
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className={badgeClass}>
            {value === "bank" ? "Bank" : "Cash"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-center">Date</div>,
    cell: ({ getValue }) => (
      <div className="text-center">
        {format(new Date(getValue()), "MM/dd/yyyy")}
      </div>
    ),
  },
];
