"use client";

import React from "react";
import { PettyCashTable } from "@/components/tables/operations-pettycash-table";
import { columns } from "./_components/tuition-pettycash-columns";
import { useTuitionPettyCashs } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";

const PettyCashPage = () => {
  const { data: pettyCash, isLoading, error } = useTuitionPettyCashs(); // Adjust the query hook if necessary

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!pettyCash) return <p>No petty cash records found</p>;

  console.log(pettyCash);

  return (
    <div>
      <h1>All Petty Cash Records</h1>
      <PettyCashTable columns={columns} data={pettyCash} />
    </div>
  );
};

export default PettyCashPage;
