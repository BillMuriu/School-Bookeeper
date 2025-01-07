"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { tuitionOpeningBalanceSchema } from "../../rmi-opening-balance-schema";
import EditDeleteOpeningBalanceForm from "../../_components/edit-delete-tuition-opening-balance";
import { useTuitionOpeningBalance } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const TuitionOpeningBalanceFormWrapper = ({ params }) => {
  const openingBalanceId = params?.id;

  // Use the query to fetch tuition opening balance data
  const {
    data: openingBalance,
    isLoading,
    error,
  } = useTuitionOpeningBalance(openingBalanceId); // Updated hook for tuition

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!openingBalance) return <p>No opening balance data found</p>;

  return (
    <RhfProvider
      schema={tuitionOpeningBalanceSchema} // Updated schema for tuition
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

export default TuitionOpeningBalanceFormWrapper;
