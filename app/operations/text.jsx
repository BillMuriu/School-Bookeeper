import React from 'react';
import FilesCard from './components/files-card';
import SeparatorWithText from './components/sperator-with-text';

const OperationAccount = () => {
  return (
    <>
      <span className="font-bold mb-9 w-full text-center text-xl">Operations Account Files</span>
      <SeparatorWithText text="Money Received"/>

      <div className="w-full rounded-lg">
        <FilesCard 
          title="Opening balance"
          description="The operations account monthly opening balances "
          buttonVariant="outline"
          viewAllText="View all"
        />
        <FilesCard 
          title="Receipts"
          description="Deploy your new project in one-click."
          buttonText="Create"
          buttonVariant="outline"
          viewAllText="View all"
        />
        <FilesCard 
          title="Payment Vouchers"
          description="Payment vouchers that can be filtered by month"
          buttonText="Create"
          buttonVariant="outline"
          viewAllText="View all"
        />
        <FilesCard 
          title="Petty Cash"
          description="Petty Cash that can be filtered by month"
          buttonText="Create"
          buttonVariant="outline"
          viewAllText="View all"
        />
        <FilesCard 
          title="Bank Charges"
          description="Bank Charges that can be filtered by month"
          buttonText="Create"
          buttonVariant="outline"
          viewAllText="View all"
        />
      </div>
    </>
  );
};

export default OperationAccount;
