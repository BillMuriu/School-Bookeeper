"use client";

import React from "react";
import { PettyCashDataTable } from "@/components/tables/pettycash/advanced-operations-pettycash";
import { columns } from "./_components/RMI-pettycash-columns";
import { useRmiPettyCashs } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";

const PettyCashPage = () => {
  const { data: pettyCash, isLoading, error } = useRmiPettyCashs(); // Adjust the query hook if necessary

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
