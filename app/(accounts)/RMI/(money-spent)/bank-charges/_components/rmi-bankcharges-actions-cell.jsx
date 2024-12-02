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
import { useDeleteRmiBankCharge } from "../_services/mutations";
import { useRouter } from "next/navigation";

const RmiBankChargesActionsCell = ({ bankCharge }) => {
  const deleteBankChargesMutation = useDeleteRmiBankCharge();
  const router = useRouter();

  const handleViewBankCharge = (id) => {
    router.push(`/operations/view-bankcharge/${id}`); // Adjusted route for bank charges
  };

  const onDelete = (id) => {
    deleteBankChargesMutation.mutate([id], {
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
        <DropdownMenuItem onClick={() => handleViewBankCharge(bankCharge.id)}>
          View bank charge
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(bankCharge.id)}>
          Delete bank charge
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RmiBankChargesActionsCell;
