import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants"; // BASE_URL = "http://127.0.0.1:8000/api/"

export function useSchoolFundPettyCash(id) {
  return useQuery({
    queryKey: ["schoolFundPettyCash", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/school-fund-petty-cash/${id}/`
      );
      return response.data;
    },
  });
}

export function useSchoolFundPettyCashs() {
  return useQuery({
    queryKey: ["schoolFundPettyCash"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/school-fund-petty-cash/`);
      return response.data;
    },
  });
}
