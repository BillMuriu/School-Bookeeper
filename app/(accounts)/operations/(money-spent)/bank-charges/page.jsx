"use client";

import React from "react";
import { BankChargesTable } from "@/components/tables/operations-bankcharges-table";
import { columns } from "./_components/operations-bankcharges-columns";
import { useAllOperationsBankCharges } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";
const BankChargesPage = () => {
  const { data: bankCharges, isLoading, error } = useAllOperationsBankCharges();

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!bankCharges) return <p>No bank charges records found</p>;

  console.log(bankCharges);

  return (
    <div>
      <h1>All Bank Charges Records</h1>
      <BankChargesTable columns={columns} data={bankCharges} />
    </div>
  );
};

export default BankChargesPage;
