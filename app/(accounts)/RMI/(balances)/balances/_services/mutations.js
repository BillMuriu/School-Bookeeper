import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants";

// Create RMI Opening Balance
export function useCreateRmiOpeningBalance() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/rmi-balances/opening-balances/`,
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
      await queryClient.invalidateQueries(["rmiOpeningBalance"]);
      router.push("/rmi-opening-balance");

      toast.success("RMI Opening balance created!", {
        description:
          "The new RMI opening balance record has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating RMI opening balance: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Edit RMI Opening Balance
export function useEditRmiOpeningBalance() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/rmi-balances/opening-balances/${id}/`,
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
      await queryClient.invalidateQueries(["rmiOpeningBalance"]);
      toast.success("RMI Opening balance updated!", {
        description:
          "The RMI opening balance record has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating RMI opening balance: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Delete RMI Opening Balance
export function useDeleteRmiOpeningBalance() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/rmi-balances/opening-balances/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["rmiOpeningBalance"]);
      toast.success("RMI Opening balance deleted!", {
        description:
          "The RMI opening balance record has been successfully deleted.",
        duration: 3000,
      });

      router.push("/rmi-opening-balance");
    },

    onError: (error) => {
      toast.error(`Error deleting RMI opening balance: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
