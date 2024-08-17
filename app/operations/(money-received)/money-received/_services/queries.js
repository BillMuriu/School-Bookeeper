import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/operation-receipts/";

export function useOperationsReceipt(id) {
  return useQuery({
    queryKey: ["operationsReceipt", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}${id}/`);
      return response.data;
    },
  });
}

export function useOperationsReceipts({ minAmount, maxAmount } = {}) {
  return useQuery({
    queryKey: ["operationsReceipts", { minAmount, maxAmount }],
    queryFn: async () => {
      const response = await axios.get(BASE_URL, {
        params: {
          ...(minAmount !== undefined && { minAmount }),
          ...(maxAmount !== undefined && { maxAmount }),
        },
      });
      return response.data;
    },
  });
}
