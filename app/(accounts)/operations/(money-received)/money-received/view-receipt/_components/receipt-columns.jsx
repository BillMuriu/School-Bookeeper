"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import ActionsCell from "./action-cell";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "receivedFrom",
    header: ({ column }) => <div className="text-left">Received From</div>,
    cell: ({ getValue }) => {
      const value = getValue();
      const badgeValues = ["rmi", "school_fund", "operations_account"];
      const isPettyCash = value === "pettycash";

      return (
        <div className="flex items-center justify-start gap-4 space-y-1">
          {badgeValues.includes(value) && (
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
          <span className="text-center text-sm">{value}</span>
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
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const receipt = row.original;
      return <ActionsCell receipt={receipt} />;
    },
  },
];
