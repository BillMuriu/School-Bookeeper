import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/operations-bankcharges/";

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
