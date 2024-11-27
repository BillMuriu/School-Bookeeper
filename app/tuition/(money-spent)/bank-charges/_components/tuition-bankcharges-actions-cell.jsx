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
import { useDeleteTuitionBankCharge } from "../_services/mutations";
import { useRouter } from "next/navigation";

const TuitionBankChargesActionsCell = ({ bankCharge }) => {
  const deleteBankChargesMutation = useDeleteTuitionBankCharge(); // Use the mutation for deleting tuition bank charges
  const router = useRouter();

  const handleViewBankCharge = (id) => {
    router.push(`/tuition/view-bankcharge/${id}`); // Updated route for viewing tuition bank charges
  };

  const onDelete = (id) => {
    deleteBankChargesMutation.mutate([id], {
      onSuccess: () => {
        window.location.reload(); // Refresh page after deletion
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
        <DropdownMenuItem onClick={() => handleViewBankCharge(bankCharge.id)}>
          View tuition bank charge
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(bankCharge.id)}>
          Delete tuition bank charge
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TuitionBankChargesActionsCell;
