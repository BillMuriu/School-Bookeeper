"use client";

import React from "react";
// import { BankChargesTable } from "@/components/tables/bank-charges/advanced-operations-bank-charges";
import { RmiBankChargesTable } from "@/components/tables/bank-charges/rmi-bank-charges/advanced-operations-bank-charges";
import { columns } from "./_components/rmi-bankcharges-columns";
import { useAllRmiBankCharges } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";
const BankChargesPage = () => {
  const { data: bankCharges, isLoading, error } = useAllRmiBankCharges();

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!bankCharges) return <p>No bank charges records found</p>;

  console.log(bankCharges);

  return (
    <div>
      <h1>All Bank Charges Records</h1>
      <RmiBankChargesTable columns={columns} data={bankCharges} />
    </div>
  );
};

export default BankChargesPage;
