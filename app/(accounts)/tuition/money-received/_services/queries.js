import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants";

export function useTuitionReceipt(id) {
  return useQuery({
    queryKey: ["tuitionReceipt", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/tuition-receipts/${id}/`);
      return response.data;
    },
  });
}

export function useTuitionReceipts({ minAmount, maxAmount } = {}) {
  return useQuery({
    queryKey: ["tuitionReceipts", { minAmount, maxAmount }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/tuition-receipts/`, {
        params: {
          ...(minAmount !== undefined && { minAmount }),
          ...(maxAmount !== undefined && { maxAmount }),
        },
      });
      return response.data;
    },
  });
}
