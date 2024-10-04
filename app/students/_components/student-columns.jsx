"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import StudentActionsCell from "./students-action-cell";

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
    accessorKey: "admissionNumber", // Ensure this matches with the key used in the filter
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
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ getValue }) => format(new Date(getValue()), "MM/dd/yyyy"), // Format date
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "admissionDate",
    header: "Admission Date",
    cell: ({ getValue }) => format(new Date(getValue()), "MM/dd/yyyy"), // Format date
  },
  {
    accessorKey: "gradeClassLevel",
    header: "Grade/Class Level",
  },
  {
    accessorKey: "guardiansName",
    header: "Guardian's Name",
  },
  {
    accessorKey: "guardiansPhoneNumber",
    header: "Guardian's Phone Number",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
      return <StudentActionsCell student={student} />; // Use the imported component
    },
  },
];
