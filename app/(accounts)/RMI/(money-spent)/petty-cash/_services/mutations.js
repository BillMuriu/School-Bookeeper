import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner"; // Assuming you're using Sonner for toast notifications
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants"; // Importing BASE_URL from constants

export function useCreateRmiPettyCash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/rmi-petty-cash/`, // Using BASE_URL
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
      await queryClient.invalidateQueries(["rmiPettyCash"]); // Updated query key
      toast.success("RMI petty cash created!", {
        description:
          "The new RMI petty cash record has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating RMI petty cash: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useEditRmiPettyCash() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/rmi-petty-cash/${id}/`, // Using BASE_URL
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
      await queryClient.invalidateQueries(["rmiPettyCash"]); // Updated query key
      toast.success("RMI petty cash entry updated!", {
        description: "The RMI petty cash entry has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating RMI petty cash: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useDeleteRmiPettyCash() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/rmi-petty-cash/${id}/`, // Using BASE_URL
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["rmiPettyCash"]); // Updated query key
      toast.success("RMI petty cash entry deleted!", {
        description: "The RMI petty cash entry has been successfully deleted.",
        duration: 3000,
      });

      // Redirect to the RMI petty cash list page after deletion
      router.push("/rmi-petty-cash");
    },

    onError: (error) => {
      toast.error(`Error deleting RMI petty cash: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
