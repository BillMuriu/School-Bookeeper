"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const receiptsColumns = [
  {
    accessorKey: "from_whom",
    header: "From Whom",
  },
  {
    accessorKey: "receipt_no",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Receipt No
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "cash",
    header: "Cash",
    cell: ({ getValue }) =>
      parseFloat(getValue().replace(/,/g, "")).toLocaleString("en-KE", {
        style: "currency",
        currency: "KES",
      }),
  },
  {
    accessorKey: "bank",
    header: "Bank",
    cell: ({ getValue }) =>
      parseFloat(getValue().replace(/,/g, "")).toLocaleString("en-KE", {
        style: "currency",
        currency: "KES",
      }),
  },
  {
    accessorKey: "rmi",
    header: "RMI",
  },
  {
    accessorKey: "other_voteheads",
    header: "Other Voteheads",
  },
];
