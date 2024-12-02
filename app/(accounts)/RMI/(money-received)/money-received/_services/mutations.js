// mutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants";

export function useCreateRmiReceipt() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${BASE_URL}/rmi-receipts/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["rmiReceipts"]);
      const receiptId = data.id;
      router.push(`/rmi/money-received/view-receipt/${receiptId}`);

      toast.success("Receipt created!", {
        description: "The new RMI receipt has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating RMI receipt: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useEditRmiReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      await axios.put(`${BASE_URL}/rmi-receipts/${id}/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["rmiReceipts"] });
      toast.success("Receipt Edited Successfully!", {
        description: "The RMI receipt has been successfully edited.",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(`Error editing RMI receipt: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useDeleteRmiReceipts() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (ids) => {
      // Delete receipts in parallel
      await Promise.all(
        ids.map((id) => axios.delete(`${BASE_URL}/rmi-receipts/${id}/`))
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["rmiReceipts"] });
      toast.success("Receipts Deleted Successfully!", {
        description: "The RMI receipts have been successfully deleted.",
        duration: 3000,
      });
      // Redirect after deletion
      router.push("/rmi/money-received/view-receipt");
    },
    onError: (error) => {
      toast.error(`Error deleting RMI receipts: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
