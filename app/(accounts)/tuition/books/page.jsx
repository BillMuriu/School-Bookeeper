import React from "react";
import BooksCard from "../components/books-card";
import { Badge } from "@/components/ui/badge";

const BooksTuition = () => {
  return (
    <div className="flex flex-col items-center mb-10 bg-card p-6 rounded-lg shadow-sm space-y-4">
      <Badge className="px-4 py-1 text-md w-fit text-background bg-foreground border border-border">
        Books
      </Badge>
      <div className="w-full h-full rounded-lg lg:flex flex-row gap-2">
        <BooksCard
          title="Cashbooks"
          description="Cashbooks that can be filtered by month"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/school-fund/cashbooks"
          addNewLink="/school-fund/cashbooks/add-new"
        />
        <BooksCard
          title="Trial Balances"
          description="Trial Balances that can be filtered by month"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/school-fund/trial-balances"
          addNewLink="/school-fund/trial-balances/add-new"
        />
        <BooksCard
          title="Balance Sheets"
          description="Balance Sheets that can be filtered by month"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/school-fund/balance-sheets"
          addNewLink="/school-fund/balance-sheets/add-new"
        />
      </div>
    </div>
  );
};

export default BooksTuition;
