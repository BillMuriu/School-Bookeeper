"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
    cell: ({ getValue }) => {
      const balance = getValue();
      let badgeColor = "";

      // Adjusting badge color logic
      if (balance < 0) {
        // Negative balance (good, so green)
        badgeColor = "bg-green-100 text-green-500 border-green-500";
      } else if (balance > 0) {
        // Positive balance (bad, so red)
        badgeColor = "bg-red-100 text-red-500 border-red-500";
      } else {
        // Zero balance (neutral, so gray)
        badgeColor = "bg-gray-100 text-gray-500 border-gray-500";
      }

      return (
        <div className="flex items-center space-x-2">
          {/* Badge with balance value */}
          <Badge variant="outline" className={`border ${badgeColor}`}>
            {balance}
          </Badge>
        </div>
      );
    },
  },
];
