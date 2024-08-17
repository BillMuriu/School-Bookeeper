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
        "http://127.0.0.1:8000/api/operation-receipts/create/",
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
      await queryClient.invalidateQueries(["receipts"]);
      const receiptId = data.id;
      router.push(`/operations/money-received/view-receipt/${receiptId}`);

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

export function useEditOperationReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      await axios.put(
        `http://localhost:8000/api/operation-receipts/${id}/update/`,
        data
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["receipts"] });
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

export function useDeleteOperationReceipts() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (ids) => {
      // Delete receipts in parallel
      await Promise.all(
        ids.map((id) =>
          axios.delete(
            `http://localhost:8000/api/operation-receipts/${id}/delete/`
          )
        )
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["receipts"] });
      toast("Receipts Deleted Successfully!", {
        description: "The receipts have been successfully deleted.",
        duration: 3000,
      });
      // Redirect after deletion
      router.push("/operations/money-received/view-receipt");
    },
    onError: (error) => {
      toast.error(`Error deleting receipts: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
