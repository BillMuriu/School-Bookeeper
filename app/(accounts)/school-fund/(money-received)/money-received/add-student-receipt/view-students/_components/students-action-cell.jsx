import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const StudentActionsCell = ({ student }) => {
  const router = useRouter();

  // Function to navigate to the "View Student" page
  const handleViewStudent = (id) => {
    router.push(`/students/view/${id}`);
  };

  // Function to navigate to the "Add Receipt" page
  const handleAddReceipt = (studentId) => {
    router.push(`/school-fund/money-received/add-student-receipt/${studentId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleAddReceipt(student.id)}>
          Add Receipt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StudentActionsCell;
