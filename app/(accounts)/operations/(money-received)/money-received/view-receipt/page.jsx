"use client";

import React from "react";
import { DataTable } from "@/components/tables/receipts/advanced-operations-receipts-table";
import { columns } from "./_components/receipt-columns";
import { useOperationsReceipts } from "../_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";

const ReceiptsTable = () => {
  const router = useRouter();
  const { data: receipts, isLoading, error } = useOperationsReceipts();

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!receipts) return <p>No receipts found</p>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft /> Back
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/operations/money-received/add-receipt")}
        >
          <CirclePlus /> New Receipt
        </Button>
      </div>
      <DataTable columns={columns} data={receipts} />
    </div>
  );
};

export default ReceiptsTable;
