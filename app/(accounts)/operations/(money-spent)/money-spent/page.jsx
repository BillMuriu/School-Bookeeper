import React from "react";
import FilesCard from "../../components/files-card";
import SeparatorWithText from "../../components/sperator-with-text";

const MoneySpentOperations = () => {
  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-lg">
      <span className="font-bold mb-6 w-full text-center text-xl">
        Money Spent
      </span>
      <div className="w-full h-full rounded-lg lg:flex flex-row gap-2">
        <FilesCard
          title="Payment Vouchers"
          description="Payment vouchers that can be filtered by month"
          buttonText="Add new"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink=""
          addNewLink="/operations/money-received/add-receipt"
        />
        <FilesCard
          title="Petty Cash"
          description="Petty Cash that can be filtered by month"
          buttonText="Add new"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink=""
          addNewLink="/operations/money-received/add-receipt"
        />
        <FilesCard
          title="Bank Charges"
          description="Bank Charges that can be filtered by month"
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

export default MoneySpentOperations;
