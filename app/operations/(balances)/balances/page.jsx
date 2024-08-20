"use client";

import React from "react";
import { OperationsBalanceTable } from "@/components/tables/operations-balances-table";
import { columns } from "./_components/operations-balances-columns";
import { useOperationsOpeningBalances } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";

const OperationsBalancePage = () => {
  const {
    data: operationsBalances,
    isLoading,
    error,
  } = useOperationsOpeningBalances(); // Adjust the query hook if necessary

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!operationsBalances) return <p>No operations balance records found</p>;

  console.log(operationsBalances);

  return (
    <div>
      <h1>All Operations Balance Records</h1>
      <OperationsBalanceTable columns={columns} data={operationsBalances} />
      <OperationsBalanceTable columns={columns} data={operationsBalances} />
      <OperationsBalanceTable columns={columns} data={operationsBalances} />
    </div>
  );
};

export default OperationsBalancePage;
