import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/books/cashbook/";

export function useFetchCashbooks({ year, month }, options = {}) {
  return useQuery({
    queryKey: ["cashbooks", { year, month }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}?year=${year}&month=${month}`
      );
      return response.data;
    },
    enabled: !!year && !!month, // Enable the query only if year and month are provided
    ...options, // Spread any additional options
  });
}
