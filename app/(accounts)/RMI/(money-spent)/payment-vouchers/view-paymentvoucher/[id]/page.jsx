"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { paymentVoucherSchema } from "../../paymentvoucher_schema";
import EditDeletePaymentVoucherForm from "../../_components/edit-delete-paymentvoucher";
import { useRmiPaymentVoucher } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const PaymentVoucherFormWrapper = ({ params }) => {
  const voucherId = params?.id;

  // Use the query to fetch voucher data
  const { data: voucher, isLoading, error } = useRmiPaymentVoucher(voucherId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!voucher) return <p>No voucher data found</p>;

  return (
    <RhfProvider
      schema={paymentVoucherSchema}
      defaultValues={{
        account: voucher.account || "rmi_account",
        voucherNo: voucher.voucher_no ?? null, // Adjusted to match schema field
        payeeName: voucher.payee_name || "", // Adjusted to match schema field
        particulars: voucher.particulars || "",
        amountShs: voucher.amount_shs ? parseFloat(voucher.amount_shs) : null, // Adjusted to match schema field
        paymentMode: voucher.payment_mode || "cash", // Adjusted to match schema field
        totalAmountInWords: voucher.total_amount_in_words || "", // Adjusted to match schema field
        preparedBy: voucher.prepared_by || "", // Adjusted to match schema field
        authorisedBy: voucher.authorised_by || "", // Adjusted to match schema field
        voteHead: voucher.vote_head || "", // Adjusted to match schema field
        voteDetails: voucher.vote_details || "", // Adjusted to match schema field
        date: voucher.date ? new Date(voucher.date) : new Date(),
      }}
    >
      <EditDeletePaymentVoucherForm voucherId={voucherId} />
    </RhfProvider>
  );
};

export default PaymentVoucherFormWrapper;
