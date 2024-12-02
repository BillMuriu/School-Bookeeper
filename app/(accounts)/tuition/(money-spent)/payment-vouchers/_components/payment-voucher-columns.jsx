"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import PaymentVoucherVoucherActionsCell from "./paymentvoucher-table-action-cell";
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
    accessorKey: "voucher_no", // Matches schema field "voucher_no"
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Voucher No
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "payee_name", // Matches schema field "payee_name"
    header: "Payee Name",
  },
  {
    accessorKey: "amount_shs", // Matches schema field "amount_shs"
    header: "Amount (Shs)",
    cell: ({ getValue }) => parseFloat(getValue()).toFixed(2), // Format amount as decimal
  },
  {
    accessorKey: "payment_mode", // Matches schema field "payment_mode"
    header: "Payment Mode",
  },
  {
    accessorKey: "date", // Matches schema field "date"
    header: "Date",
    cell: ({ getValue }) => format(new Date(getValue()), "MM/dd/yyyy"), // Format date
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const voucher = row.original;
      return <PaymentVoucherVoucherActionsCell voucher={voucher} />;
    },
  },
];
