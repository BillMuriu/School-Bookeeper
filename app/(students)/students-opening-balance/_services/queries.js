import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants"; // http://127.0.0.1:8000/api

// Query to fetch a single student opening balance by ID
export function useStudentOpeningBalance(id) {
  return useQuery({
    queryKey: ["studentOpeningBalance", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/students_opening_balances/${id}/`
      );
      return response.data;
    },
  });
}

// Query to fetch all student opening balances
export function useStudentOpeningBalances() {
  return useQuery({
    queryKey: ["studentOpeningBalances"],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/students_opening_balances/`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true, // Refetch data when the window is focused
  });
}
