"use client";

import { format } from "date-fns";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const columns = [
  {
    accessorKey: "payee_name",
    header: () => <div className="text-left">Payee Name</div>,
    cell: ({ getValue }) => {
      const rawValue = getValue();
      const formattedValue = rawValue
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
      return <div className="text-left">{formattedValue}</div>;
    },
  },
  {
    accessorKey: "cheque_number",
    header: () => <div className="text-left">Cheque Number</div>,
    cell: ({ getValue, row }) => {
      const value = getValue();
      const pettyCashId = row.original.id;
      return (
        <div className="flex items-center justify-start gap-2">
          <div className="text-left">{value}</div>
          <Link
            href={`/petty-cash/view/${pettyCashId}`}
            className="text-blue-500 hover:text-blue-700"
            aria-label="View Cheque Details"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-left">Amount (Shs)</div>,
    cell: ({ getValue }) => (
      <div className="text-left">
        {parseFloat(getValue()).toFixed(2)} {/* Format amount as decimal */}
      </div>
    ),
  },
  {
    accessorKey: "date_issued",
    header: () => <div className="text-center">Date Issued</div>,
    cell: ({ getValue }) => (
      <div className="text-center">
        {format(new Date(getValue()), "MM/dd/yyyy")} {/* Format date */}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Description</div>,
    cell: ({ getValue }) => {
      const description = getValue();
      const words = description.split(" ").slice(0, 2).join(" ");
      return (
        <div className="text-left">
          {words}
          {description.split(" ").length > 2 ? "..." : ""}
        </div>
      );
    },
  },
];
