import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/school_fund_receipts/";

export function useSchoolFundReceipt(id) {
  return useQuery({
    queryKey: ["schoolFundReceipt", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}${id}/`);
      return response.data;
    },
  });
}

export function useSchoolFundReceipts({ minAmount, maxAmount } = {}) {
  return useQuery({
    queryKey: ["schoolFundReceipts", { minAmount, maxAmount }],
    queryFn: async () => {
      const response = await axios.get(BASE_URL, {
        params: {
          ...(minAmount !== undefined && { minAmount }),
          ...(maxAmount !== undefined && { maxAmount }),
        },
      });
      return response.data;
    },
  });
}
