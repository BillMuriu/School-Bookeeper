import React from "react";
import FilesCard from "../components/files-card";
import { Badge } from "@/components/ui/badge";
const MoneyReceivedTuition = () => {
  return (
    <div className="flex flex-col items-center mb-10 bg-card p-6 rounded-lg shadow-sm space-y-4">
      <Badge className="px-4 py-1 text-md w-fit text-background bg-foreground border border-border">
        Money Received
      </Badge>
      <div className="w-full h-full rounded-lg lg:flex flex-row gap-4">
        <FilesCard
          title="Receipts"
          description="Receipts that can be filtered by month"
          buttonText="Add new"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/RMI/money-received/view-receipt"
          addNewLink="/RMI/money-received/add-receipt"
        />
      </div>
    </div>
  );
};

export default MoneyReceivedTuition;
