import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants";

export function useTermPeriod(id) {
  return useQuery({
    queryKey: ["termPeriod", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/term_periods/${id}/`);
      return response.data;
    },
  });
}

export function useTermPeriods({ startDate, endDate } = {}) {
  return useQuery({
    queryKey: ["termPeriods", { startDate, endDate }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/term_periods/`, {
        params: {
          ...(startDate !== undefined && { startDate }),
          ...(endDate !== undefined && { endDate }),
        },
      });
      return response.data;
    },
  });
}
