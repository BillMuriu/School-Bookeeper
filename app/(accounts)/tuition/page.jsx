import React from "react";
import MoneyReceivedTuition from "./money-received/page";
import MoneySpentTuition from "./(money-spent)/money-spent/page";
import BooksTuition from "./books/page";
const AllFiles = () => {
  return (
    <div>
      <MoneyReceivedTuition />
      <MoneySpentTuition />
      <BooksTuition />
    </div>
  );
};

export default AllFiles;
