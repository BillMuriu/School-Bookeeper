import React from "react";
import FilesCard from "../../components/files-card";
import { Badge } from "@/components/ui/badge";

const MoneySpentRmi = () => {
  return (
    <div className="flex flex-col items-center mb-10 bg-card p-6 rounded-lg shadow-sm space-y-4">
      <Badge className="px-4 py-1 text-md w-fit text-background bg-foreground border border-border">
        Money Spent
      </Badge>
      <div className="w-full h-full rounded-lg lg:flex flex-row gap-2">
        <FilesCard
          title="Payment Vouchers"
          description="Payment vouchers that can be filtered by month"
          buttonText="Add new"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/RMI/money-received/"
          addNewLink="/RMI/money-received/add-receipt"
        />
        <FilesCard
          title="Petty Cash"
          description="Petty Cash that can be filtered by month"
          buttonText="Add new"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/RMI/money-received/"
          addNewLink="/RMI/money-received/add-receipt"
        />
        <FilesCard
          title="Bank Charges"
          description="Bank Charges that can be filtered by month"
          buttonText="Add new"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/RMI/money-received/"
          addNewLink="/RMI/money-received/add-receipt"
        />
      </div>
    </div>
  );
};

export default MoneySpentRmi;
