import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants";
// Fetch a single RMI bank charge by ID
export function useRmiBankCharge(id) {
  return useQuery({
    queryKey: ["rmiBankCharge", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/rmi-bank-charges/${id}/`);
      return response.data;
    },
  });
}

// Fetch all RMI bank charges
export function useAllRmiBankCharges() {
  return useQuery({
    queryKey: ["rmiBankCharges"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/rmi-bank-charges/`);
      return response.data;
    },
  });
}
