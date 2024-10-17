import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants";
// Fetch a specific RMI Payment Voucher by ID
export function useRmiPaymentVoucher(id) {
  return useQuery({
    queryKey: ["rmiPaymentVoucher", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/rmi-payment-vouchers/${id}/`
      );
      return response.data;
    },
  });
}

// Fetch all RMI Payment Vouchers
export function useRmiPaymentVouchers() {
  return useQuery({
    queryKey: ["rmiPaymentVouchers"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/rmi-payment-vouchers/`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true, // Refetch on window focus
  });
}
