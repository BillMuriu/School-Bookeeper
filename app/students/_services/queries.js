import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/students/"; // Adjust the URL to your API endpoint

// Query to fetch a single student by ID
export function useStudent(id) {
  return useQuery({
    queryKey: ["student", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}${id}/`);
      return response.data;
    },
  });
}

// Query to fetch all students
export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await axios.get(BASE_URL);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true, // Refetch data when the window is focused
  });
}
