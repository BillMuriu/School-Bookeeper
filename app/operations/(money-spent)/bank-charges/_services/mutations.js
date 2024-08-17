import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useCreateOperationsBankCharge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bank-charges/",
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
      await queryClient.invalidateQueries(["bankCharges"]); // Update the query key as needed

      toast.success("Bank charge created!", {
        description:
          "The new bank charge record has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
