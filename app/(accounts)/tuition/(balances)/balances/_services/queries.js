import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants";

// Fetch a single Tuition opening balance by ID
export function useTuitionOpeningBalance(id) {
  return useQuery({
    queryKey: ["tuitionOpeningBalance", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/tuition-balances/opening-balances/${id}/`
      );
      return response.data;
    },
  });
}

// Fetch all Tuition opening balances
export function useTuitionOpeningBalances() {
  return useQuery({
    queryKey: ["tuitionOpeningBalances"],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/tuition-balances/opening-balances/`
      );
      return response.data;
    },
  });
}
