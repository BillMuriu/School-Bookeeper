"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
