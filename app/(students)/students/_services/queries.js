import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants"; // http://127.0.0.1:8000/api

// Query to fetch a single student by ID
export function useStudent(id) {
  return useQuery({
    queryKey: ["student", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/students/${id}/`); // Include /students/ in the URL
      return response.data;
    },
  });
}

// Query to fetch all students
export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/students/`); // Include /students/ in the URL
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true, // Refetch data when the window is focused
  });
}
