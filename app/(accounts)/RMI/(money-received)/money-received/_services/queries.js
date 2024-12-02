import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants";
export function useRmiReceipt(id) {
  return useQuery({
    queryKey: ["rmiReceipt", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/rmi-receipts/${id}/`);
      return response.data;
    },
  });
}

export function useRmiReceipts({ minAmount, maxAmount } = {}) {
  return useQuery({
    queryKey: ["rmiReceipts", { minAmount, maxAmount }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/rmi-receipts/`, {
        params: {
          ...(minAmount !== undefined && { minAmount }),
          ...(maxAmount !== undefined && { maxAmount }),
        },
      });
      return response.data;
    },
  });
}
