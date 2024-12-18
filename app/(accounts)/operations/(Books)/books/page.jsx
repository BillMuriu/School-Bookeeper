import React from "react";
import BooksCard from "../../components/books-card";
import { Badge } from "@/components/ui/badge";

const OperationsBooks = () => {
  return (
    <div className="flex flex-col items-center mb-10 bg-card p-6 rounded-lg shadow-md space-y-4">
      <Badge className="px-4 py-1 text-lg w-fit text-background bg-foreground border border-border">
        Books
      </Badge>
      <div className="w-full h-full rounded-lg lg:flex flex-row gap-2">
        <BooksCard
          title="Cashbooks"
          description="Cashbooks that can be filtered by month"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/operations/cashbooks"
          addNewLink="/operations/cashbooks/add-new"
        />
        <BooksCard
          title="Ledgers"
          description="Ledgers that can be filtered by month"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/operations/ledgers"
          addNewLink="/operations/ledgers/add-new"
        />
        <BooksCard
          title="Trial Balances"
          description="Trial Balances that can be filtered by month"
          buttonVariant="outline"
          viewAllText="View all"
          viewAllLink="/operations/trial-balances"
          addNewLink="/operations/trial-balances/add-new"
        />
      </div>
    </div>
  );
};

export default OperationsBooks;
