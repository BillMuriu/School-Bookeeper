"use client";

import React from "react";
// import { PettyCashTable } from "@/components/tables/operations-pettycash-table";
import { PettyCashDataTable } from "@/components/tables/pettycash/advanced-operations-pettycash";
import { columns } from "./_components/operations-pettycash-columns";
import { useOperationsPettyCashs } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";
import { dummyPettyCash } from "@/data/dummy-pettycash";
const PettyCashPage = () => {
  const { data: pettyCash, isLoading, error } = useOperationsPettyCashs(); // Adjust the query hook if necessary

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!pettyCash) return <p>No petty cash records found</p>;

  console.log(pettyCash);

  return (
    <div>
      <h1>All Petty Cash Records</h1>
      <PettyCashDataTable columns={columns} data={pettyCash} />
    </div>
  );
};

export default PettyCashPage;
