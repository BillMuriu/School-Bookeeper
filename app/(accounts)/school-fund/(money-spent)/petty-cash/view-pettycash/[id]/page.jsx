"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { pettyCashSchema } from "../../pettycash-schema";
import EditDeleteSchoolFundPettyCashForm from "../../_components/edit-delete-schoolfund-pettycash";
import { useSchoolFundPettyCash } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const PettyCashFormWrapper = ({ params }) => {
  const pettyCashId = params?.id;

  // Use the query to fetch petty cash data
  const {
    data: pettyCash,
    isLoading,
    error,
  } = useSchoolFundPettyCash(pettyCashId); // Query to fetch the petty cash data

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!pettyCash) return <p>No petty cash data found</p>;

  return (
    <RhfProvider
      schema={pettyCashSchema} // Petty cash schema for validation
      defaultValues={{
        account: pettyCash.account || "operations_account",
        payee_name: pettyCash.payee_name || "",
        cheque_number: pettyCash.cheque_number || "",
        amount: pettyCash.amount ? parseFloat(pettyCash.amount) : null,
        description: pettyCash.description || "",
        date_issued: pettyCash.date_issued
          ? new Date(pettyCash.date_issued)
          : new Date(),
      }}
    >
      <EditDeleteSchoolFundPettyCashForm pettyCashId={pettyCashId} />{" "}
      {/* Pass the petty cash ID to the form */}
    </RhfProvider>
  );
};

export default PettyCashFormWrapper;
