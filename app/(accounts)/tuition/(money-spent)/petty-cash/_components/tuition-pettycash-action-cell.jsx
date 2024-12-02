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
import { useDeleteTuitionPettyCash } from "../_services/mutations"; // Adjusted mutation hook for tuition
import { useRouter } from "next/navigation";

const TuitionPettyCashActionsCell = ({ pettyCash }) => {
  const deletePettyCashMutation = useDeleteTuitionPettyCash(); // Hook for deleting tuition petty cash
  const router = useRouter();

  const handleViewPettyCash = (id) => {
    router.push(`/tuition/view-pettycash/${id}`); // Adjusted route for tuition petty cash view
  };

  const onDelete = (id) => {
    deletePettyCashMutation.mutate([id], {
      onSuccess: () => {
        window.location.reload();
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
        <DropdownMenuItem onClick={() => handleViewPettyCash(pettyCash.id)}>
          View petty cash
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(pettyCash.id)}>
          Delete petty cash
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TuitionPettyCashActionsCell;
