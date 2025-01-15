import React from "react";
import MoneyReceivedSchoolFund from "./(money-received)/money-received/page";
import MoneySpentSchoolFund from "./(money-spent)/money-spent/page";
import BooksSchoolFund from "./books/page";
const AllFiles = () => {
  return (
    <div>
      <MoneyReceivedSchoolFund />
      <MoneySpentSchoolFund />
      <BooksSchoolFund />
    </div>
  );
};

export default AllFiles;
