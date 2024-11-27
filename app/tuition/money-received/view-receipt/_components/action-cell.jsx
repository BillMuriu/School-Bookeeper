// ActionsCell.jsx
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
import { useDeleteRmiReceipts } from "../../_services/mutations";
import { useRouter } from "next/navigation";

const ActionsCell = ({ receipt }) => {
  const deleteOperationsReceiptMutation = useDeleteRmiReceipts();
  const router = useRouter();

  const handleViewReceipt = (id) => {
    router.push(`/operations/money-received/view-receipt/${id}`);
  };

  const onDelete = (id) => {
    deleteOperationsReceiptMutation.mutate([id], {
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
        <DropdownMenuItem onClick={() => handleViewReceipt(receipt.id)}>
          View receipt
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(receipt.id)}>
          Delete receipt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsCell;
