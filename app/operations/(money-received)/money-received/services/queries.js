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

export function useOperationsReceipts() {
  return useQuery({
    queryKey: ["operationsReceipts"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:8080/operationalReceipts"
      );
      return response.data;
    },
  });
}
