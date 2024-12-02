import React from "react";
import FilesCard from "@/app/RMI/components/files-card"; //I imported this from the RMI just as a place holder

const MoneyReceivedOperations = () => {
  return (
    <>
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
    </>
  );
};

export default MoneyReceivedOperations;
