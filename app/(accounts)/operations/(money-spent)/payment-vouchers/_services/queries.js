import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/operations-paymentvouchers/";

export function useOperationsPaymentVoucher(id) {
  return useQuery({
    queryKey: ["paymentVoucher", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}${id}/`);
      return response.data;
    },
  });
}

export function useOperationsPaymentVouchers() {
  return useQuery({
    queryKey: ["paymentVouchers"],
    queryFn: async () => {
      const response = await axios.get(BASE_URL);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });
}
