import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner"; // Assuming you're using Sonner for toast notifications

export function useCreateOperationsPettyCash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/operations-pettycash/", // Update the endpoint as necessary
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
      await queryClient.invalidateQueries(["pettyCash"]); // Update the query key as needed
      //   const pettyCashId = data.id;
      //   router.push(`/petty-cash/view/${pettyCashId}`);

      toast.success("Petty cash created!", {
        description: "The new petty cash record has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating petty cash: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
