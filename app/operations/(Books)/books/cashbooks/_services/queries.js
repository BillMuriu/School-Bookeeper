import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/books/cashbook/";

export function useOperationsCashbook({ year, month }, options = {}) {
  return useQuery({
    queryKey: ["cashbook", { year, month }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}?year=${year}&month=${month}`
      );
      return response.data;
    },
    ...options, // Spread the options into the query
  });
}
