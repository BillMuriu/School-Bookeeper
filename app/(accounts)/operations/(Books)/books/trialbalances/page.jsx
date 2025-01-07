import React from "react";

const TrialBalances = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <iframe
        src="https://billmuriu.github.io/trial-balace-check/#/operations-trial-balance"
        className="w-full h-[720px] border-none"
        style={{
          display: "block",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
        title="Trial Balances"
      ></iframe>
    </div>
  );
};

export default TrialBalances;
