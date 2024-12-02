"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import OperationsPettyCashActionsCell from "./operations-pettycash-action-cell";
import { Button } from "@/components/ui/button";
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
    accessorKey: "payeeName",
    header: "Payee Name",
  },
  {
    accessorKey: "chequeNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cheque Number
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount (Shs)",
    cell: ({ getValue }) => parseFloat(getValue()).toFixed(2), // Format amount as decimal
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "dateIssued",
    header: "Date Issued",
    cell: ({ getValue }) => format(new Date(getValue()), "MM/dd/yyyy"), // Format date
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const pettyCash = row.original;
      return <OperationsPettyCashActionsCell pettyCash={pettyCash} />; // Adjust based on your actual actions
    },
  },
];
