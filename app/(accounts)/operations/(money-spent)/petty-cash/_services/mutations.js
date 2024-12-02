import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner"; // Assuming you're using Sonner for toast notifications
import { useRouter } from "next/navigation";

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

export function useEditOperationsPettyCash() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/operations-pettycash/${id}/`,
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
      await queryClient.invalidateQueries(["pettyCash"]);
      toast.success("Petty cash entry updated!", {
        description: "The petty cash entry has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating petty cash: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useDeleteOperationsPettyCash() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/operations-pettycash/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["pettyCash"]);
      toast.success("Petty cash entry deleted!", {
        description: "The petty cash entry has been successfully deleted.",
        duration: 3000,
      });

      // Redirect to the petty cash list page after deletion
      router.push("/petty-cash");
    },

    onError: (error) => {
      toast.error(`Error deleting petty cash: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
