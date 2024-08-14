import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useOperationsReceipt(id) {
  return useQuery({
    queryKey: ["operationsReceipt", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8080/operationalReceipts/${id}`
      );
      return response.data;
    },
  });
}

export function useOperationsReceipts({ minAmount, maxAmount } = {}) {
  return useQuery({
    queryKey: ["operationsReceipts", { minAmount, maxAmount }],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:8080/operationalReceipts",
        {
          params: {
            ...(minAmount !== undefined && { minAmount }),
            ...(maxAmount !== undefined && { maxAmount }),
          },
        }
      );
      return response.data;
    },
  });
}
