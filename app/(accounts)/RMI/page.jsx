import React from "react";
import MoneyReceivedRmi from "./(money-received)/money-received/page";
import MoneySpentRmi from "./(money-spent)/money-spent/page";
import BooksRmi from "./(Books)/books/page";
import { Separator } from "@/components/ui/separator";
const AllFiles = () => {
  return (
    <div>
      <MoneyReceivedRmi />
      <MoneySpentRmi />
      <BooksRmi />
    </div>
  );
};

export default AllFiles;
