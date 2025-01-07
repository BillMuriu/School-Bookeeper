import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants";

// Fetch a single RMI opening balance by ID
export function useRmiOpeningBalance(id) {
  return useQuery({
    queryKey: ["rmiOpeningBalance", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/rmi-balances/opening-balances/${id}/`
      );
      return response.data;
    },
  });
}

// Fetch all RMI opening balances
export function useRmiOpeningBalances() {
  return useQuery({
    queryKey: ["rmiOpeningBalances"],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/rmi-balances/opening-balances/`
      );
      return response.data;
    },
  });
}
