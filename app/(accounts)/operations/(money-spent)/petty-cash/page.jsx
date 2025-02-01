"use client";

import React from "react";
// import { PettyCashTable } from "@/components/tables/operations-pettycash-table";
import { PettyCashDataTable } from "@/components/tables/pettycash/advanced-operations-pettycash";
import { columns } from "./_components/operations-pettycash-columns";
import { useOperationsPettyCashs } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
const PettyCashPage = () => {
  const router = useRouter();
  const { data: pettyCash, isLoading, error } = useOperationsPettyCashs(); // Adjust the query hook if necessary

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!pettyCash) return <p>No petty cash records found</p>;

  console.log(pettyCash);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft /> Back
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/operations/petty-cash/add-pettycash")}
        >
          <CirclePlus /> Add PettyCash
        </Button>
      </div>
      <PettyCashDataTable columns={columns} data={pettyCash} />
    </div>
  );
};

export default PettyCashPage;
