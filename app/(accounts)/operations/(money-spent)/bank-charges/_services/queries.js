import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants"; // https://6508-105-160-13-116.ngrok-free.app/api

export function useOperationsBankCharge(id) {
  return useQuery({
    queryKey: ["bankCharge", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/operations-bankcharges/${id}/`
      );
      return response.data;
    },
  });
}

export function useAllOperationsBankCharges() {
  return useQuery({
    queryKey: ["bankCharges"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/operations-bankcharges/`);
      return response.data;
    },
  });
}
