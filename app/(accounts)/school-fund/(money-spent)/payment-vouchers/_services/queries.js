// queries.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants";

// Fetch a single school fund payment voucher by ID
export function useSchoolFundPaymentVoucher(id) {
  return useQuery({
    queryKey: ["schoolFundPaymentVoucher", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/school-fund-payment-vouchers/${id}/`
      );
      return response.data;
    },
  });
}

// Fetch all school fund payment vouchers
export function useSchoolFundPaymentVouchers() {
  return useQuery({
    queryKey: ["schoolFundPaymentVouchers"],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/school-fund-payment-vouchers/`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true, // Refetch on focus
  });
}
