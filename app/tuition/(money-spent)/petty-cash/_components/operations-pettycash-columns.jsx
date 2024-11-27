"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import RmiPettyCashActionsCell from "./rmi-pettycash-action-cell"; // Update import based on actual actions
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Updated columns for RMI Petty Cash
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
    accessorKey: "payee_name", // Updated to match schema field
    header: "Payee Name",
  },
  {
    accessorKey: "cheque_number", // Updated to match schema field
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
    accessorKey: "amount", // Updated to match schema field
    header: "Amount (Shs)",
    cell: ({ getValue }) => parseFloat(getValue()).toFixed(2), // Format amount as decimal
  },
  {
    accessorKey: "description", // Updated to match schema field
    header: "Description",
  },
  {
    accessorKey: "date_issued", // Updated to match schema field
    header: "Date Issued",
    cell: ({ getValue }) => format(new Date(getValue()), "MM/dd/yyyy"), // Format date
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const pettyCash = row.original;
      return <RmiPettyCashActionsCell pettyCash={pettyCash} />; // Adjust based on your actual actions
    },
  },
];
