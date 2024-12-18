import React from "react";
import MoneyReceivedOperations from "./(money-received)/money-received/page";
import MoneySpentOperations from "./(money-spent)/money-spent/page";
import OperationsBooks from "./(Books)/books/page";
import { Separator } from "@/components/ui/separator";
const AllFiles = () => {
  return (
    <div>
      <MoneyReceivedOperations />
      <MoneySpentOperations />
      <OperationsBooks />
    </div>
  );
};

export default AllFiles;
