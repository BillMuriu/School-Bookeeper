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
import { useDeleteTermPeriods } from "../_services/mutations"; // Updated delete mutation for term period
import { useRouter } from "next/navigation";

const ActionsCell = ({ termPeriod }) => {
  const deleteTermPeriodMutation = useDeleteTermPeriods(); // Use the term period delete mutation
  const router = useRouter();

  const handleViewTermPeriod = (id) => {
    router.push(`/term-periods/view-term-period/${id}`); // Updated route for term period
  };

  const onDelete = (id) => {
    deleteTermPeriodMutation.mutate([id], {
      onSuccess: () => {
        window.location.reload(); // Reload after successful deletion
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
        <DropdownMenuItem onClick={() => handleViewTermPeriod(termPeriod.id)}>
          View term period
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(termPeriod.id)}>
          Delete term period
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsCell;
