"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { paymentVoucherSchema } from "../../paymentvoucher_schema";
import EditDeletePaymentVoucherForm from "../../_components/edit-delete-paymentvoucher";
import { useOperationsPaymentVoucher } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const PaymentVoucherFormWrapper = ({ params }) => {
  const voucherId = params?.id;

  // Use the query to fetch voucher data
  const {
    data: voucher,
    isLoading,
    error,
  } = useOperationsPaymentVoucher(voucherId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!voucher) return <p>No voucher data found</p>;

  return (
    <RhfProvider
      schema={paymentVoucherSchema}
      defaultValues={{
        account: voucher.account || "operations_account",
        voucherNo: voucher.voucherNo ?? null,
        payeeName: voucher.payeeName || "",
        particulars: voucher.particulars || "",
        amountShs: voucher.amountShs ? parseFloat(voucher.amountShs) : null,
        paymentMode: voucher.paymentMode || "cash",
        totalAmountInWords: voucher.totalAmountInWords || "",
        preparedBy: voucher.preparedBy || "",
        authorisedBy: voucher.authorisedBy || "",
        voteHead: voucher.voteHead || "",
        voteDetails: voucher.voteDetails || "",
        date: voucher.date ? new Date(voucher.date) : new Date(),
      }}
    >
      <EditDeletePaymentVoucherForm voucherId={voucherId} />
    </RhfProvider>
  );
};

export default PaymentVoucherFormWrapper;
