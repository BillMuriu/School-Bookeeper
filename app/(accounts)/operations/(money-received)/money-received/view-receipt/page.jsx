"use client";

import React from "react";
// import { DataTable } from "@/components/tables/operations-receipts-table";
import { DataTable } from "@/components/tables/receipts/advanced-operations-receipts-table";
import { columns } from "./_components/receipt-columns";
import { useOperationsReceipts } from "../_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";

const ReceiptsTable = () => {
  const { data: receipts, isLoading, error } = useOperationsReceipts();

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!receipts) return <p>No receipts found</p>;

  return (
    <div>
      <h1>All Receipts</h1>
      <DataTable columns={columns} data={receipts} />
    </div>
  );
};

export default ReceiptsTable;
