import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants";

export function useCreateOperationsOpeningBalance() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/operations-balances/opening-balances/`,
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
      await queryClient.invalidateQueries(["openingBalance"]);
      router.push("/opening-balance");

      toast.success("Opening balance created!", {
        description:
          "The new opening balance record has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating opening balance: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useEditOperationsOpeningBalance() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/operations-balances/opening-balances/${id}/`, // Use the BASE_URL constant
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
      await queryClient.invalidateQueries(["openingBalance"]);
      toast.success("Opening balance updated!", {
        description:
          "The opening balance record has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating opening balance: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useDeleteOperationsOpeningBalance() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/operations-balances/opening-balances/${id}/`, // Use the BASE_URL constant
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["openingBalance"]);
      toast.success("Opening balance deleted!", {
        description:
          "The opening balance record has been successfully deleted.",
        duration: 3000,
      });

      router.push("/opening-balance");
    },

    onError: (error) => {
      toast.error(`Error deleting opening balance: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
