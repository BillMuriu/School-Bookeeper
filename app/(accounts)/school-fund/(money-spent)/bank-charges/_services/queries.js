import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants";

export function useSchoolFundBankCharge(id) {
  return useQuery({
    queryKey: ["schoolFundBankCharge", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/school-fund-bank-charges/${id}/`
      );
      return response.data;
    },
  });
}

export function useAllSchoolFundBankCharges() {
  return useQuery({
    queryKey: ["schoolFundBankCharges"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/school-fund-bank-charges/`);
      return response.data;
    },
  });
}
