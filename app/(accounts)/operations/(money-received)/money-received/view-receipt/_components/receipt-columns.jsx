"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import ActionsCell from "./action-cell";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "receivedFrom",
    header: "Received From",
    cell: ({ getValue }) => {
      const value = getValue();
      const badgeValues = ["rmi", "school_fund", "operations_account"];
      const isPettyCash = value === "pettycash"; // Check for pettycash

      return (
        <div className="flex items-center space-x-2">
          {badgeValues.includes(value) && (
            <Badge
              variant="outline"
              className="border-blue-500 bg-blue-100 text-blue-500"
            >
              IAB
            </Badge>
          )}
          {isPettyCash && (
            <Badge
              variant="outline"
              className="border-purple-500 bg-purple-100 text-purple-500"
            >
              Petty Cash
            </Badge> // Add subtle badge for pettycash
          )}
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => format(new Date(getValue()), "MM/dd/yyyy"),
  },
  {
    accessorKey: "cashBank", // Add the new column
    header: "Payment Method",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div>
          {value === "bank" ? (
            <Badge
              variant="outline"
              className="border-green-500 bg-green-100 text-green-500"
            >
              Bank
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="border-yellow-500 bg-yellow-100 text-yellow-500"
            >
              Cash
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const receipt = row.original;
      return <ActionsCell receipt={receipt} />;
    },
  },
];
