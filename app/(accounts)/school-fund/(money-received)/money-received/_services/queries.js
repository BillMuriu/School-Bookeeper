// queries.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants"; // Importing BASE_URL from constants

export function useSchoolFundReceipt(id) {
  return useQuery({
    queryKey: ["schoolFundReceipt", { id }],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/school_fund_receipts/${id}/`
      ); // Using BASE_URL
      return response.data;
    },
  });
}

export function useSchoolFundReceipts({ minAmount, maxAmount } = {}) {
  return useQuery({
    queryKey: ["schoolFundReceipts", { minAmount, maxAmount }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/school_fund_receipts/`, {
        params: {
          ...(minAmount !== undefined && { minAmount }),
          ...(maxAmount !== undefined && { maxAmount }),
        },
      });
      return response.data;
    },
  });
}
