import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants"; // Importing BASE_URL from constants

export function useOperationsPettyCash(id) {
  return useQuery({
    queryKey: ["pettyCash", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/operations-pettycash/${id}/`
      ); // Using BASE_URL
      return response.data;
    },
  });
}

export function useOperationsPettyCashs() {
  return useQuery({
    queryKey: ["pettyCash"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/operations-pettycash/`); // Using BASE_URL
      return response.data;
    },
  });
}
