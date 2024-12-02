import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base URL for RMI petty cash API
const BASE_URL = "http://127.0.0.1:8000/api/rmi-petty-cash/";

// Query for a single RMI petty cash record by ID
export function useRmiPettyCash(id) {
  return useQuery({
    queryKey: ["rmiPettyCash", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}${id}/`);
      return response.data;
    },
  });
}

// Query for all RMI petty cash records
export function useRmiPettyCashs() {
  return useQuery({
    queryKey: ["rmiPettyCashs"],
    queryFn: async () => {
      const response = await axios.get(BASE_URL);
      return response.data;
    },
  });
}
