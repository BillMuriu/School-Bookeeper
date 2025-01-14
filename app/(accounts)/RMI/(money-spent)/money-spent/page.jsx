import React from "react";
import FilesCard from "../../components/files-card";
import SeparatorWithText from "../../components/sperator-with-text";

const MoneySpentRmi = () => {
  return (
    <>
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
          addNewLink="/RMI/money-received/add-receipt"
        />
        <FilesCard
          title="Petty Cash"
          description="Petty Cash that can be filtered by month"
          buttonText="Add new"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink=""
          addNewLink="/RMI/money-received/add-receipt"
        />
        <FilesCard
          title="Bank Charges"
          description="Bank Charges that can be filtered by month"
          buttonText="Add new"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink=""
          addNewLink="/RMI/money-received/add-receipt"
        />
      </div>
    </>
  );
};

export default MoneySpentRmi;
