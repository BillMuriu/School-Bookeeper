// "use client";

// import React from "react";
// import { OperationsBalanceTable } from "@/components/tables/operations-balances-table";
// import { columns } from "./_components/rmi-balances-columns";
// import { useRmiOpeningBalances } from "./_services/queries";
// import DataTableSkeleton from "@/components/datatable-seleton-loader";

// const RmiBalancePage = () => {
//   const { data: rmiBalances, isLoading, error } = useRmiOpeningBalances(); // Adjust the query hook if necessary

//   if (isLoading) return <DataTableSkeleton />;
//   if (error) return <p>Error: {error.message}</p>;
//   if (!rmiBalances) return <p>No operations balance records found</p>;

//   console.log(rmiBalances);

//   return (
//     <div>
//       <h1>All Operations Balance Records</h1>
//       <OperationsBalanceTable columns={columns} data={rmiBalances} />
//     </div>
//   );
// };

// export default RmiBalancePage;

import React from "react";

const Wagwan2 = () => {
  return <div>Wagwan2</div>;
};

export default Wagwan2;
