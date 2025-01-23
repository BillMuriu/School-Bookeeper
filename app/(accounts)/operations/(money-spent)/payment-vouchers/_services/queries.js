import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants"; // Make sure to define the BASE_URL

export function useOperationsPaymentVoucher(id) {
  return useQuery({
    queryKey: ["paymentVoucher", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/operations-paymentvouchers/${id}/`
      );
      return response.data;
    },
  });
}

export function useOperationsPaymentVouchers() {
  return useQuery({
    queryKey: ["paymentVouchers"],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/operations-paymentvouchers/`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });
}
