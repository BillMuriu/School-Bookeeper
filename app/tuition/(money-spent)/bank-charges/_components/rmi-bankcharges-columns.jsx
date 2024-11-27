"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import RmiBankChargesActionsCell from "./rmi-bankcharges-actions-cell";
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
    accessorKey: "account",
    header: "Account",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount (Shs)
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => parseFloat(getValue()).toFixed(2), // Format amount as decimal
  },
  {
    accessorKey: "chargeDate",
    header: "Charge Date",
    cell: ({ getValue }) => format(new Date(getValue()), "MM/dd/yyyy"), // Format date
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const bankCharge = row.original;
      return <RmiBankChargesActionsCell bankCharge={bankCharge} />;
    },
  },
];
