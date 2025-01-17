"use client";

import React from "react";
import { SchoolFundBankChargesTable } from "@/components/tables/bank-charges/schoolfund-bank-charges/advanced-operations-bank-charges";
import { columns } from "./_components/schoolfund-bankcharges-columns";
import { useAllSchoolFundBankCharges } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";
const BankChargesPage = () => {
  const { data: bankCharges, isLoading, error } = useAllSchoolFundBankCharges();

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!bankCharges) return <p>No bank charges records found</p>;

  console.log(bankCharges);

  return (
    <div>
      <h1>All Bank Charges Records</h1>
      <SchoolFundBankChargesTable columns={columns} data={bankCharges} />
    </div>
  );
};

export default BankChargesPage;
