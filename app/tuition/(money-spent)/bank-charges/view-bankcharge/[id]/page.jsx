"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { bankChargesSchema } from "../../bankcharges-schema";
import EditDeleteTuitionBankChargesForm from "../../_components/edit-delete-tuition-bankcharges"; // Updated component for tuition bank charges
import { useTuitionBankCharge } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const TuitionBankChargesFormWrapper = ({ params }) => {
  const bankChargeId = params?.id;

  // Use the query to fetch tuition bank charge data
  const {
    data: bankCharge,
    isLoading,
    error,
  } = useTuitionBankCharge(bankChargeId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!bankCharge) return <p>No bank charge data found</p>;

  return (
    <RhfProvider
      schema={bankChargesSchema} // Use the schema for tuition bank charges
      defaultValues={{
        account: bankCharge.account || "tuition_account", // Default to tuition account
        amount: bankCharge.amount ? parseFloat(bankCharge.amount) : 0,
        chargeDate: bankCharge.charge_date
          ? new Date(bankCharge.charge_date) // Ensure it's in the correct date format
          : new Date(),
        description: bankCharge.description || "",
      }}
    >
      <EditDeleteTuitionBankChargesForm bankChargeId={bankChargeId} />
    </RhfProvider>
  );
};

export default TuitionBankChargesFormWrapper;
