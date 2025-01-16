"use client";

import React from "react";
import { SchoolFundPettyCashDataTable } from "@/components/tables/pettycash/schoolfund-pettycash/advanced-schoolfund-pettycash";
import { columns } from "./_components/schoolfund-pettycash-columns";
import { useOperationsPettyCashs } from "./_services/queries";
import { useSchoolFundPettyCashs } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";

const PettyCashPage = () => {
  const { data: pettyCash, isLoading, error } = useSchoolFundPettyCashs(); // Adjust the query hook if necessary

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!pettyCash) return <p>No petty cash records found</p>;

  console.log(pettyCash);

  return (
    <div>
      <h1>SchoolFund Petty Cash Records</h1>
      <SchoolFundPettyCashDataTable columns={columns} data={pettyCash} />
    </div>
  );
};

export default PettyCashPage;
