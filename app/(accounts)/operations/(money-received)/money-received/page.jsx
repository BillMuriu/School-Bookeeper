import React from "react";
import FilesCard from "../../components/files-card";
import SeparatorWithText from "../../components/sperator-with-text";

const MoneyReceivedOperations = () => {
  return (
    <div className="flex flex-col">
      <span className="font-bold mb-6 w-full text-center text-xl">
        Money Received
      </span>
      <div className="w-full h-full rounded-lg lg:flex flex-row gap-2">
        <FilesCard
          title="Receipts"
          description="Receipts that can be filtered by month"
          buttonText="Add new"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink=""
          addNewLink="/operations/money-received/add-receipt"
        />
      </div>
    </div>
  );
};

export default MoneyReceivedOperations;
