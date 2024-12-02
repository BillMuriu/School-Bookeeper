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
import { useDeleteOperationsPaymentVoucher } from "../_services/mutations";
import { useRouter } from "next/navigation";

const PaymentVoucherActionsCell = ({ voucher }) => {
  // Renamed 'receipt' to 'voucher'
  const deletePaymentVoucherMutation = useDeleteOperationsPaymentVoucher(); // Adjusted mutation hook
  const router = useRouter();

  const handleViewVoucher = (id) => {
    router.push(`/payments/view-voucher/${id}`); // Adjusted route for payment vouchers
  };

  const onDelete = (id) => {
    deletePaymentVoucherMutation.mutate([id], {
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
        <DropdownMenuItem onClick={() => handleViewVoucher(voucher.id)}>
          View voucher
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(voucher.id)}>
          Delete voucher
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PaymentVoucherActionsCell;
