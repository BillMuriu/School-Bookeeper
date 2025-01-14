import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL =
  "https://6508-105-160-13-116.ngrok-free.app/api/operations-bankcharges/";

export function useOperationsBankCharge(id) {
  return useQuery({
    queryKey: ["bankCharge", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}${id}/`);
      return response.data;
    },
  });
}

export function useAllOperationsBankCharges() {
  return useQuery({
    queryKey: ["bankCharges"],
    queryFn: async () => {
      const response = await axios.get(BASE_URL);
      return response.data;
    },
  });
}
