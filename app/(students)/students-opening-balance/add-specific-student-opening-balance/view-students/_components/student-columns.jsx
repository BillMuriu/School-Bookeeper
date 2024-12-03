"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import StudentActionsCell from "./students-action-cell";

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
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
      return <StudentActionsCell student={student} />;
    },
  },
];
