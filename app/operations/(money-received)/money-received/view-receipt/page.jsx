"use client";

import React from "react";
import { DataTable } from "@/components/tables/operations-receipts-table";
import { columns } from "./receipt-columns";
import { useOperationsReceipts } from "../_services/queries";

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

// "use client";

// import React from "react";
// import { DataTable } from "@/components/tables/operations-receipts-table";
// import { columns } from "./receipt-columns";
// import { useOperationsReceipts } from "../_services/queries";
// import { useDeleteOperationReceipts } from "../_services/mutations";
// import { Button } from "@/components/ui/button";

// const ReceiptsTable = () => {
//   const { data: receipts, isLoading, error } = useOperationsReceipts();
//   const deleteOperationsReceiptMutation = useDeleteOperationReceipts();
//   const [selectedRows, setSelectedRows] = React.useState({});

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;
//   if (!receipts) return <p>No receipts found</p>;

//   const handleBulkDelete = () => {
//     const selectedReceiptIds = Object.keys(selectedRows).filter(id => selectedRows[id]);

//     deleteOperationsReceiptMutation.mutate(selectedReceiptIds, {
//       onSuccess: () => {
//         // Optionally reload the table data or refresh the page
//         window.location.reload();
//       },
//       onError: (error) => {
//         // Optionally handle errors
//         console.error(`Error deleting receipts: ${error.message}`);
//       },
//     });
//   };

//   return (
//     <div>
//       <h1>All Receipts</h1>
//       <Button onClick={handleBulkDelete} disabled={!Object.keys(selectedRows).some(id => selectedRows[id])}>
//         Delete Selected
//       </Button>
//       <DataTable
//         columns={columns}
//         data={receipts}
//         onSelectionChange={(selection) => setSelectedRows(selection)}
//       />
//     </div>
//   );
// };

// export default ReceiptsTable;
