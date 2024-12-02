"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import ActionsCell from "./action-cell"; // Adjust as needed for term period actions
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
    accessorKey: "term_name", // Updated to reflect term name
    header: "Term Name",
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "start_date", // Updated to reflect start date of term
    header: "Start Date",
    cell: ({ getValue }) => format(new Date(getValue()), "MM/dd/yyyy"), // Format date
  },
  {
    accessorKey: "end_date", // Updated to reflect end date of term
    header: "End Date",
    cell: ({ getValue }) => format(new Date(getValue()), "MM/dd/yyyy"), // Format date
  },
  {
    accessorKey: "year", // Updated to reflect year of the term
    header: "Year",
  },
  {
    accessorKey: "fees", // Updated to reflect fees
    header: "Fees",
    cell: ({ getValue }) => `$${parseFloat(getValue()).toFixed(2)}`, // Format as currency
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const termPeriod = row.original; // Updated to refer to term period
      return <ActionsCell termPeriod={termPeriod} />; // Pass the term period to the action cell
    },
  },
];
