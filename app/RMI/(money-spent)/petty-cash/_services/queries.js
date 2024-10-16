import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/operations-pettycash/";

export function useOperationsPettyCash(id) {
  return useQuery({
    queryKey: ["pettyCash", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}${id}/`);
      return response.data;
    },
  });
}

export function useOperationsPettyCashs() {
  return useQuery({
    queryKey: ["pettyCash"],
    queryFn: async () => {
      const response = await axios.get(BASE_URL);
      return response.data;
    },
  });
}
