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
import { useDeleteStudent } from "../_services/mutations";
import { useRouter } from "next/navigation";

const StudentActionsCell = ({ student }) => {
  const deleteStudentMutation = useDeleteStudent(); // Adjusted mutation hook for deleting a student
  const router = useRouter();

  const handleViewStudent = (id) => {
    router.push(`/students/view/${id}`); // Adjusted route for viewing student details
  };

  const onDelete = (id) => {
    deleteStudentMutation.mutate([id], {
      onSuccess: () => {
        window.location.reload(); // Reloads the page upon successful deletion
      },
    });
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
        <DropdownMenuItem onClick={() => handleViewStudent(student.id)}>
          View Student
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(student.id)}>
          Delete Student
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StudentActionsCell;
