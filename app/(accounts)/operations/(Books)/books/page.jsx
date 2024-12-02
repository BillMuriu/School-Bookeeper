import React from 'react';
import BooksCard from '../../components/books-card';
import SeparatorWithText from '../../components/sperator-with-text';

const BooksOperations = () => {
  return (
    <>
      <span className="font-bold mb-6 w-full text-center text-xl">Books</span>
      <div className="w-full h-full rounded-lg lg:flex flex-row gap-2">
        <BooksCard
          title="Cashbooks"
          description="Cashbooks that can be filtered by month"
          buttonVariant="outline"
          viewAllText="View all"
        />
        <BooksCard
          title="Trial Balances"
          description="Petty Cash that can be filtered by month"
          buttonVariant="outline"
          viewAllText="View all"
        />
        <BooksCard
          title="Balance Sheets"
          description="Bank Charges that can be filtered by month"
          buttonVariant="outline"
          viewAllText="View all"
        />
      </div>
    </>
  );
};

export default BooksOperations;