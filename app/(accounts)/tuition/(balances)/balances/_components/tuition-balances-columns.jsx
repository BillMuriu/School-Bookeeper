"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns = [
  {
    accessorKey: "account",
    header: "Account",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => format(new Date(getValue()), "MM/dd/yyyy"), // Format date
  },
  {
    accessorKey: "bankAmount",
    header: "Bank Amount (Shs)",
    cell: ({ getValue }) => parseFloat(getValue()).toFixed(2), // Format amount as decimal
  },
  {
    accessorKey: "cashAmount",
    header: "Cash Amount (Shs)",
    cell: ({ getValue }) => parseFloat(getValue()).toFixed(2), // Format amount as decimal
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
