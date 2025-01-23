import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner"; // Assuming you're using Sonner for toast notifications
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants"; // Make sure to define BASE_URL

export function useCreateOperationsPettyCash() {
  const queryClient = useQueryClient();
  const router = useRouter(); // Initialize the router

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/operations-pettycash/`,
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
      toast.success("Petty cash created!", {
        description: "The new petty cash record has been successfully created.",
        duration: 3000,
      });

      // Redirect the user after the petty cash is created
      router.push("/operations/petty-cash"); // Replace with the desired URL
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
        `${BASE_URL}/operations-pettycash/${id}/`, // Using the BASE_URL here
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
        `${BASE_URL}/operations-pettycash/${id}/`, // Using the BASE_URL here
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
      router.push("/operations/petty-cash");
    },

    onError: (error) => {
      toast.error(`Error deleting petty cash: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
