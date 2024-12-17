"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import ActionsCell from "./action-cell";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
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
            <Badge variant="outline" className="bg-blue-500 text-white">
              IAB
            </Badge>
          )}
          {isPettyCash && (
            <Badge variant="outline" className="bg-purple-500 text-white">
              Petty Cash
            </Badge> // Add badge for pettycash
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
            <Badge variant="outline" className="bg-green-500 text-white">
              Bank
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-yellow-500 text-white">
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
