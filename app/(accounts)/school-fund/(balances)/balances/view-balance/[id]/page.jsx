"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { rmiOpeningBalanceSchema } from "../../rmi-opening-balance-schema";
import EditDeleteOpeningBalanceForm from "../../_components/edit-delete-rmi-opening-balance";
import { useRmiOpeningBalance } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const RmiOpeningBalanceFormWrapper = ({ params }) => {
  const openingBalanceId = params?.id;

  // Use the query to fetch operations opening balance data
  const {
    data: openingBalance,
    isLoading,
    error,
  } = useRmiOpeningBalance(openingBalanceId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!openingBalance) return <p>No opening balance data found</p>;

  return (
    <RhfProvider
      schema={rmiOpeningBalanceSchema}
      defaultValues={{
        account: openingBalance.account || "",
        date: openingBalance.date ? new Date(openingBalance.date) : new Date(),
        bankAmount: parseFloat(openingBalance.bankAmount) || 0.0,
        cashAmount: parseFloat(openingBalance.cashAmount) || 0.0,
        description: openingBalance.description || "",
      }}
    >
      <EditDeleteOpeningBalanceForm openingBalanceId={openingBalanceId} />
    </RhfProvider>
  );
};

export default RmiOpeningBalanceFormWrapper;
