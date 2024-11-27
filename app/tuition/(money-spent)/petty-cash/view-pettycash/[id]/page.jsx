"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { pettyCashSchema } from "../../pettycash-schema";
import EditDeletePettyCashForm from "../../_components/edit-delete-tuition-pettycash";
import { useTuitionPettyCash } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const PettyCashFormWrapper = ({ params }) => {
  const pettyCashId = params?.id;

  // Use the query to fetch petty cash data
  const {
    data: pettyCash,
    isLoading,
    error,
  } = useTuitionPettyCash(pettyCashId); // Query to fetch the petty cash data

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!pettyCash) return <p>No petty cash data found</p>;

  return (
    <RhfProvider
      schema={pettyCashSchema} // Petty cash schema for validation
      defaultValues={{
        account: pettyCash.account || "tuition_account",
        payeeName: pettyCash.payee_name || "",
        chequeNumber: pettyCash.cheque_number || "",
        amount: pettyCash.amount ? parseFloat(pettyCash.amount) : null,
        description: pettyCash.description || "",
        dateIssued: pettyCash.dateIssued
          ? new Date(pettyCash.dateIssued)
          : new Date(),
      }}
    >
      <EditDeletePettyCashForm pettyCashId={pettyCashId} />{" "}
      {/* Pass the petty cash ID to the form */}
    </RhfProvider>
  );
};

export default PettyCashFormWrapper;
