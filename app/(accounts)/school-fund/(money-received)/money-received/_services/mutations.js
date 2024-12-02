// mutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useCreateSchoolFundReceipt() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/school_fund_receipts/", // Updated URL
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["schoolFundReceipts"]);
      const receiptId = data.id;
      router.push(`/school-fund/money-received/view-receipt/${receiptId}`);

      toast.success("Receipt created!", {
        description: "The new receipt has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating receipt: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useEditSchoolFundReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      await axios.put(
        `http://127.0.0.1:8000/api/school_fund_receipts/${id}/`, // Updated URL
        data
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["schoolFundReceipts"] });
      toast("Receipt Edited Successfully!", {
        description: "The receipt has been successfully edited.",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(`Error editing receipt: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useDeleteSchoolFundReceipts() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (ids) => {
      // Delete receipts in parallel
      await Promise.all(
        ids.map((id) =>
          axios.delete(
            `http://127.0.0.1:8000/api/school_fund_receipts/${id}/` // Updated URL
          )
        )
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["schoolFundReceipts"] });
      toast("Receipts Deleted Successfully!", {
        description: "The receipts have been successfully deleted.",
        duration: 3000,
      });
      // Redirect after deletion
      router.push("/school-fund/money-received/view-receipt");
    },
    onError: (error) => {
      toast.error(`Error deleting receipts: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
