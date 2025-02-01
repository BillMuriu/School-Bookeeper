"use client";

import React from "react";
import { BankChargesTable } from "@/components/tables/bank-charges/advanced-operations-bank-charges";
import { columns } from "./_components/operations-bankcharges-columns";
import { useAllOperationsBankCharges } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
const BankChargesPage = () => {
  const router = useRouter();
  const { data: bankCharges, isLoading, error } = useAllOperationsBankCharges();

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!bankCharges) return <p>No bank charges records found</p>;

  console.log(bankCharges);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft /> Back
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/operations/bank-charges/add-bankcharge")}
        >
          <CirclePlus /> Add Bank-Charge
        </Button>
      </div>
      <BankChargesTable columns={columns} data={bankCharges} />
    </div>
  );
};

export default BankChargesPage;
