"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const cashbook_receipts_colums = [
  {
    accessorKey: "from_whom",
    header: "From Whom",
  },
  {
    accessorKey: "receipt_no",
    header: "Receipt No",
  },
  {
    accessorKey: "cash",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cash (Shs)
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => parseFloat(getValue().replace(/,/g, "")).toFixed(2), // Format cash amount as decimal
  },
  {
    accessorKey: "bank",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Bank (Shs)
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => parseFloat(getValue().replace(/,/g, "")).toFixed(2), // Format bank amount as decimal
  },
  {
    accessorKey: "rmi",
    header: "RMI",
    cell: ({ getValue }) =>
      getValue() === "-" ? "N/A" : parseFloat(getValue()).toFixed(2), // Format RMI amount
  },
  {
    accessorKey: "other_voteheads",
    header: "Other Voteheads",
    cell: ({ getValue }) =>
      getValue() === "-" ? "N/A" : parseFloat(getValue()).toFixed(2), // Format Other Voteheads amount
  },
];
