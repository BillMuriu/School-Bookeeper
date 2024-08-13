"use client";

import React from "react";
import { DataTable } from "@/components/tables/operations-receipts-table";
import { columns } from "./receipt-columns";
import { useOperationsReceipts } from "../services/queries";

const ReceiptsTable = () => {
  const { data: receipts, isLoading, error } = useOperationsReceipts();

  if (isLoading) return <p>Loading...</p>;
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
