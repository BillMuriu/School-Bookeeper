"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import StudentActionsCell from "./students-action-cell";

import Link from "next/link";

export const columns = [
  {
    accessorKey: "admissionNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Admission Number
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { id, admissionNumber } = row.original;
      return (
        <Link
          href={`/students/view-student/${id}`}
          className="text-blue-500 hover:underline"
        >
          {admissionNumber}
        </Link>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "gradeClassLevel",
    header: "Grade/Class Level",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
];
