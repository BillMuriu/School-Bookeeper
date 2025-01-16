import React from "react";

const Ledger = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <iframe
        src="https://billmuriu.github.io/trial-balace-check/#/operations-ledger" // Replace with the actual URL of your ledger page
        className="w-full h-[720px] border-none"
        style={{
          display: "block",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
        title="Ledger"
      ></iframe>
    </div>
  );
};

export default Ledger;
