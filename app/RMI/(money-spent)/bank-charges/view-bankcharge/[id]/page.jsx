"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { bankChargesSchema } from "../../bankcharges-schema";
import EditDeleteOperationsBankChargesForm from "../../_components/edit-delete-rmi-bankcharges";
import { useRmiBankCharge } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const RmiBankChargesFormWrapper = ({ params }) => {
  const bankChargeId = params?.id;

  // Use the query to fetch bank charge data
  const { data: bankCharge, isLoading, error } = useRmiBankCharge(bankChargeId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!bankCharge) return <p>No bank charge data found</p>;

  return (
    <RhfProvider
      schema={bankChargesSchema}
      defaultValues={{
        account: bankCharge.account || "operations_account",
        amount: bankCharge.amount ? parseFloat(bankCharge.amount) : 0,
        chargeDate: bankCharge.chargeDate
          ? new Date(bankCharge.chargeDate)
          : new Date(),
        description: bankCharge.description || "",
      }}
    >
      <EditDeleteOperationsBankChargesForm bankChargeId={bankChargeId} />
    </RhfProvider>
  );
};

export default RmiBankChargesFormWrapper;
