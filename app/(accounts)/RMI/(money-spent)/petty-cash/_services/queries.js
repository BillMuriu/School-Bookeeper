import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants"; // Importing BASE_URL from constants

// Query for a single RMI petty cash record by ID
export function useRmiPettyCash(id) {
  return useQuery({
    queryKey: ["rmiPettyCash", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/rmi-petty-cash/${id}/`); // Using BASE_URL
      return response.data;
    },
  });
}

// Query for all RMI petty cash records
export function useRmiPettyCashs() {
  return useQuery({
    queryKey: ["rmiPettyCashs"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/rmi-petty-cash/`); // Using BASE_URL
      return response.data;
    },
  });
}
