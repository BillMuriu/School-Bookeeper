import React from "react";
import FilesCard from "../../components/files-card";
import { Badge } from "@/components/ui/badge";

const MoneySpentOperations = () => {
  return (
    <div className="flex flex-col items-center mb-10 bg-card p-6 rounded-lg shadow-md space-y-4">
      <Badge className="px-4 py-1 text-lg w-fit text-background bg-foreground border border-border">
        Money Spent
      </Badge>
      <div className="w-full h-full rounded-lg lg:flex flex-row gap-2">
        <FilesCard
          title="Payment Vouchers"
          description="Payment vouchers that can be filtered by month"
          buttonText="Add new"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/operations/payment-vouchers/"
          addNewLink="/operations/payment-vouchers/add-paymentvoucher"
        />
        <FilesCard
          title="Petty Cash"
          description="Petty Cash that can be filtered by month"
          buttonText="Add new"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/operations/petty-cash/"
          addNewLink="/operations/petty-cash/add-pettycash/"
        />
        <FilesCard
          title="Bank Charges"
          description="Bank Charges that can be filtered by month"
          buttonText="Add new"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/operations/bank-charges/"
          addNewLink="/operations/bank-charges/add-bankcharge"
        />
      </div>
    </div>
  );
};

export default MoneySpentOperations;
