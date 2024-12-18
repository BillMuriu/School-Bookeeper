"use client";
import { PlusCircle } from "lucide-react"; // Import PlusCircle icon
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "admissionNumber",
    header: () => (
      <div className="w-full flex justify-start">
        {" "}
        {/* Align header to the left */}
        Admission Number
      </div>
    ),
    cell: ({ row }) => {
      const { id, admissionNumber } = row.original;
      return (
        <div className="w-full flex justify-start">
          {" "}
          {/* Make the div take full width and align left */}
          <Link
            href={`/students/view-student/${id}`}
            className="text-blue-500 hover:underline"
          >
            {admissionNumber}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="w-full flex justify-start">
        {" "}
        {/* Align header to the left */}
        Name
      </div>
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return (
        <div className="w-full flex justify-start">
          {" "}
          {/* Make the div take full width and align left */}
          <span>
            {firstName} {lastName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "gradeClassLevel",
    header: "Form Level",
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ getValue }) => {
      const balance = getValue();
      let badgeColor = "";

      // Adjusting badge color logic
      if (balance < 0) {
        badgeColor = "bg-green-100 text-green-500 border-green-500";
      } else if (balance > 0) {
        badgeColor = "bg-red-100 text-red-500 border-red-500";
      } else {
        badgeColor = "bg-gray-100 text-gray-500 border-gray-500";
      }

      return (
        <div className="flex justify-center items-center h-full">
          <Badge
            variant="outline"
            className={`border ${badgeColor} flex items-center justify-center`}
          >
            {balance}
          </Badge>
        </div>
      );
    },
  },
  {
    header: "Create Receipt",
    id: "createReceipt",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="flex justify-center">
          <Link
            href={`/school-fund/money-received/add-student-receipt/${id}`}
            passHref
          >
            <Badge className="px-2 py-1 text-black bg-gray-100 border border-gray-300 hover:bg-gray-200">
              <PlusCircle className="mr-1 w-4 h-4" />
              Create
            </Badge>
          </Link>
        </div>
      );
    },
  },
];
