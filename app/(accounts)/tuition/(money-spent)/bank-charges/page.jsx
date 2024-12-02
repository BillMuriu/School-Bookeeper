"use client";

import React from "react";
import { BankChargesTable } from "@/components/tables/operations-bankcharges-table"; // Update table to handle tuition bank charges
import { columns } from "./_components/tuition-bankcharges-columns"; // Ensure columns are for tuition bank charges
import { useAllTuitionBankCharges } from "./_services/queries"; // Update the hook for tuition bank charges
import DataTableSkeleton from "@/components/datatable-seleton-loader";

const BankChargesPage = () => {
  const { data: bankCharges, isLoading, error } = useAllTuitionBankCharges(); // Fetch tuition bank charges

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!bankCharges) return <p>No bank charges records found</p>;

  console.log(bankCharges);

  return (
    <div>
      <h1>All Tuition Bank Charges Records</h1>{" "}
      {/* Adjusted title to reflect tuition context */}
      <BankChargesTable columns={columns} data={bankCharges} />{" "}
      {/* Pass tuition-specific columns and data */}
    </div>
  );
};

export default BankChargesPage;
