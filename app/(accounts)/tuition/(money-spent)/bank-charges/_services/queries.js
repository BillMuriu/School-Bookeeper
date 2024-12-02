import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants";

// Fetch a single Tuition bank charge by ID
export function useTuitionBankCharge(id) {
  return useQuery({
    queryKey: ["tuitionBankCharge", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/tuition-bank-charges/${id}/`
      );
      return response.data;
    },
  });
}

// Fetch all Tuition bank charges
export function useAllTuitionBankCharges() {
  return useQuery({
    queryKey: ["tuitionBankCharges"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/tuition-bank-charges/`);
      return response.data;
    },
  });
}
