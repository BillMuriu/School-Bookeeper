// queries.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants"; // Importing BASE_URL from constants

// Query for a single Tuition Petty Cash record by ID
export function useTuitionPettyCash(id) {
  return useQuery({
    queryKey: ["tuitionPettyCash", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/tuition-pettycash/${id}/`); // Using BASE_URL
      return response.data;
    },
  });
}

// Query for all Tuition Petty Cash records
export function useTuitionPettyCashs() {
  return useQuery({
    queryKey: ["tuitionPettyCashs"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/tuition-pettycash/`); // Using BASE_URL
      return response.data;
    },
  });
}
