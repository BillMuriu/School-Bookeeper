import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base URL for operations opening balance
const BASE_URL =
  "http://127.0.0.1:8000/api/operations-balances/opening-balances/";

// Fetch a single operations opening balance by ID
export function useOperationsOpeningBalance(id) {
  return useQuery({
    queryKey: ["operationsOpeningBalance", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}${id}/`);
      return response.data;
    },
  });
}

// Fetch all operations opening balances
export function useOperationsOpeningBalances() {
  return useQuery({
    queryKey: ["operationsOpeningBalances"],
    queryFn: async () => {
      const response = await axios.get(BASE_URL);
      return response.data;
    },
  });
}
