// mutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants";

export function useCreateTuitionReceipt() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${BASE_URL}/tuition-receipts/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["tuitionReceipts"]);
      const receiptId = data.id;
      router.push(`/tuition/money-received/view-receipt/${receiptId}`);

      toast.success("Receipt created!", {
        description: "The new Tuition receipt has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating Tuition receipt: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useEditTuitionReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      await axios.put(`${BASE_URL}/tuition-receipts/${id}/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tuitionReceipts"] });
      toast.success("Receipt Edited Successfully!", {
        description: "The Tuition receipt has been successfully edited.",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(`Error editing Tuition receipt: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useDeleteTuitionReceipts() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (ids) => {
      // Delete receipts in parallel
      await Promise.all(
        ids.map((id) => axios.delete(`${BASE_URL}/tuition-receipts/${id}/`))
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tuitionReceipts"] });
      toast.success("Receipts Deleted Successfully!", {
        description: "The Tuition receipts have been successfully deleted.",
        duration: 3000,
      });
      // Redirect after deletion
      router.push("/tuition/money-received/view-receipt");
    },
    onError: (error) => {
      toast.error(`Error deleting Tuition receipts: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
