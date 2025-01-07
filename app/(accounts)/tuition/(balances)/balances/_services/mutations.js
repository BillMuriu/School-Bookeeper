import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants";

// Create Tuition Opening Balance
export function useCreateTuitionOpeningBalance() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/tuition-balances/opening-balances/`,
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
      await queryClient.invalidateQueries(["tuitionOpeningBalance"]);
      router.push("/tuition-opening-balance");

      toast.success("Tuition Opening balance created!", {
        description:
          "The new Tuition opening balance record has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating Tuition opening balance: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Edit Tuition Opening Balance
export function useEditTuitionOpeningBalance() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/tuition-balances/opening-balances/${id}/`,
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
      await queryClient.invalidateQueries(["tuitionOpeningBalance"]);
      toast.success("Tuition Opening balance updated!", {
        description:
          "The Tuition opening balance record has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating Tuition opening balance: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Delete Tuition Opening Balance
export function useDeleteTuitionOpeningBalance() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/tuition-balances/opening-balances/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["tuitionOpeningBalance"]);
      toast.success("Tuition Opening balance deleted!", {
        description:
          "The Tuition opening balance record has been successfully deleted.",
        duration: 3000,
      });

      router.push("/tuition-opening-balance");
    },

    onError: (error) => {
      toast.error(`Error deleting Tuition opening balance: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
