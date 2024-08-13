// mutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useCreateOperationReceipt() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:8080/operationalReceipts",
        data
      );
      return response.data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["receipts"] });
      const receiptId = data.id;
      router.push(`/operations/money-received/view-receipt/${receiptId}`);

      toast("Receipt created!", {
        description: "The new receipt has been successfully created.",
        duration: 1000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating receipt: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useEditOperationReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      await axios.put(`http://localhost:8080/operationalReceipts/${id}`, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["receipts"] });
      toast("Receipt Edited Successfully!", {
        description: "The new receipt has been successfully edited.",
        duration: 1000,
      });
    },
    onError: (error) => {
      toast("Oops", {
        description: `Error deleting receipt: ${error.message}`,
      });
    },
  });
}

export function useDeleteOperationReceipt() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:8080/operationalReceipts/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["receipts"] });
      toast("Receipt Deleted Successfully!", {
        description: "The receipt has been successfully deleted.",
        duration: 1000,
      });
      // Redirect after deletion
      router.push("/operations/money-received");
    },
    onError: (error) => {
      toast("Oops", {
        description: `Error deleting receipt: ${error.message}`,
      });
    },
  });
}
