"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { paymentVoucherSchema } from "../../paymentvoucher_schema";
import EditDeleteSchoolFundPaymentVoucherForm from "../../_components/edit-delete-paymentvoucher";
import { useSchoolFundPaymentVoucher } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const PaymentVoucherFormWrapper = ({ params }) => {
  const voucherId = params?.id;

  // Use the query to fetch voucher data
  const {
    data: voucher,
    isLoading,
    error,
  } = useSchoolFundPaymentVoucher(voucherId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!voucher) return <p>No voucher data found</p>;

  return (
    <RhfProvider
      schema={paymentVoucherSchema}
      defaultValues={{
        account: voucher.account || "school_fund_account",
        voucher_no: voucher.voucher_no ?? null,
        payee_name: voucher.payee_name || "",
        particulars: voucher.particulars || "",
        amount_shs: voucher.amount_shs ? parseFloat(voucher.amount_shs) : null,
        payment_mode: voucher.payment_mode || null,
        total_amount_in_words: voucher.total_amount_in_words || "",
        prepared_by: voucher.prepared_by || "",
        authorised_by: voucher.authorised_by || "",
        vote_head: voucher.vote_head || null,
        vote_details: voucher.vote_details || "",
        date: voucher.date ? new Date(voucher.date) : new Date(),
      }}
    >
      <EditDeleteSchoolFundPaymentVoucherForm voucherId={voucherId} />
    </RhfProvider>
  );
};

export default PaymentVoucherFormWrapper;
