"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { operationsOpeningBalanceSchema } from "../../operations-opening-balance-schema";
import EditDeleteOperationsOpeningBalanceForm from "../../_components/edit-delete-operations-opening-balance";
import { useOperationsOpeningBalance } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const OperationsOpeningBalanceFormWrapper = ({ params }) => {
  const openingBalanceId = params?.id;

  // Use the query to fetch operations opening balance data
  const {
    data: openingBalance,
    isLoading,
    error,
  } = useOperationsOpeningBalance(openingBalanceId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!openingBalance) return <p>No opening balance data found</p>;

  return (
    <RhfProvider
      schema={operationsOpeningBalanceSchema}
      defaultValues={{
        account: openingBalance.account || "",
        date: openingBalance.date ? new Date(openingBalance.date) : new Date(),
        bankAmount: parseFloat(openingBalance.bankAmount) || 0.0,
        cashAmount: parseFloat(openingBalance.cashAmount) || 0.0,
        description: openingBalance.description || "",
      }}
    >
      <EditDeleteOperationsOpeningBalanceForm
        openingBalanceId={openingBalanceId}
      />
    </RhfProvider>
  );
};

export default OperationsOpeningBalanceFormWrapper;
