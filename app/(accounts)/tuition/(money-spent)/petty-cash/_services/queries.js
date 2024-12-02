import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base URL for Tuition petty cash API
const BASE_URL = "http://127.0.0.1:8000/api/tuition-pettycash/"; // Adjusted URL

// Query for a single Tuition petty cash record by ID
export function useTuitionPettyCash(id) {
  return useQuery({
    queryKey: ["tuitionPettyCash", { id }], // Adjusted query key
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}${id}/`);
      return response.data;
    },
  });
}

// Query for all Tuition petty cash records
export function useTuitionPettyCashs() {
  return useQuery({
    queryKey: ["tuitionPettyCashs"], // Adjusted query key
    queryFn: async () => {
      const response = await axios.get(BASE_URL);
      return response.data;
    },
  });
}
