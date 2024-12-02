import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants";

// Fetch a specific Tuition Payment Voucher by ID
export function useTuitionPaymentVoucher(id) {
  return useQuery({
    queryKey: ["tuitionPaymentVoucher", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/tuition-payment-vouchers/${id}/`
      );
      return response.data;
    },
  });
}

// Fetch all Tuition Payment Vouchers
export function useTuitionPaymentVouchers() {
  return useQuery({
    queryKey: ["tuitionPaymentVouchers"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/tuition-payment-vouchers/`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true, // Refetch on window focus
  });
}
