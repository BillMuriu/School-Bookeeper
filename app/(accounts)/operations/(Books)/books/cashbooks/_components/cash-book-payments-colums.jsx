"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const paymentColumns = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "voucher_no",
    header: "Voucher No",
  },
  {
    accessorKey: "cheque_no",
    header: "Cheque No",
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
    cell: ({ getValue }) =>
      getValue() ? parseFloat(getValue()).toFixed(2) : "N/A", // Format cash amount as decimal
  },
  {
    accessorKey: "bank",
    header: "Bank",
  },
  {
    accessorKey: "bank_charge",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Bank Charge (Shs)
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) =>
      getValue() ? parseFloat(getValue()).toFixed(2) : "N/A", // Format bank charge amount as decimal
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => {
      const dateValue = new Date(getValue());
      return dateValue.toLocaleDateString(); // Format the date to a more readable format
    },
  },
];
