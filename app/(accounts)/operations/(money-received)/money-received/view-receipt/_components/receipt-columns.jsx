"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export const columns = [
  {
    accessorKey: "receivedFrom",
    header: ({ column }) => <div className="text-left">Received From</div>,
    cell: ({ getValue, row }) => {
      const rawValue = getValue();
      const receiptId = row.original.id; // Assuming 'id' is part of the row data
      const formattedValue = rawValue
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word

      const badgeValues = ["rmi", "school_fund", "operations_account"];
      const isPettyCash = rawValue === "pettycash";

      return (
        <div className="flex items-center justify-start gap-4 space-y-1">
          {badgeValues.includes(rawValue) && (
            <Badge
              variant="outline"
              className="border-blue-500 bg-blue-100 text-blue-500 flex items-center justify-center"
            >
              IAB
            </Badge>
          )}
          {isPettyCash && (
            <Badge
              variant="outline"
              className="border-purple-500 bg-purple-100 text-purple-500 flex items-center justify-center"
            >
              Petty Cash
            </Badge>
          )}
          <div className="flex items-center gap-2">
            <span className="text-center text-sm">{formattedValue}</span>
            <Link
              href={`/RMI/money-received/view-receipt/${receiptId}`}
              className="text-blue-500 hover:text-blue-700"
              aria-label={`Open link to ${formattedValue}`}
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "cashBank",
    header: "Payment Method",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="flex flex-col items-center space-y-1">
          <Badge
            variant="outline"
            className={`${
              value === "bank"
                ? "border-green-500 bg-green-100 text-green-500"
                : "border-yellow-500 bg-yellow-100 text-yellow-500"
            } flex items-center justify-center`}
          >
            {value === "bank" ? "Bank" : "Cash"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => format(new Date(getValue()), "MM/dd/yyyy"),
  },
];
