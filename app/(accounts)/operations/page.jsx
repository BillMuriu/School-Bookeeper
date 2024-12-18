import React from "react";
import MoneyReceivedOperations from "./(money-received)/money-received/page";
import MoneySpentOperations from "./(money-spent)/money-spent/page";
import OperationsBooks from "./(Books)/books/page";
import { Separator } from "@/components/ui/separator";
const AllFiles = () => {
  return (
    <div>
      <MoneyReceivedOperations />
      <Separator className="mb-10" />
      <MoneySpentOperations />
      <Separator className="mb-10" />
      <OperationsBooks />
    </div>
  );
};

export default AllFiles;
