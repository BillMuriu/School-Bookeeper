"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns = [
  {
    accessorKey: "receivedFrom",
    header: "Received From",
  },
  {
    accessorKey: "id",
    header: "Receipt No.",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => format(new Date(getValue()), "MM/dd/yyyy"), // Formatting date
  },
];
