import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner"; // Assuming you're using Sonner for toast notifications
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants"; // BASE_URL = "http://127.0.0.1:8000/api/"

export function useCreateSchoolFundPettyCash() {
  const queryClient = useQueryClient();
  const router = useRouter(); // Initialize the router

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/school-fund-petty-cash/`,
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
      await queryClient.invalidateQueries(["schoolFundPettyCash"]);
      toast.success("Petty cash created!", {
        description: "The new petty cash record has been successfully created.",
        duration: 3000,
      });

      // Redirect to a new URL (e.g., details page for the created petty cash)
      router.push("/school-fund/petty-cash");
    },

    onError: (error) => {
      toast.error(`Error creating petty cash: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useEditSchoolFundPettyCash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/school-fund-petty-cash/${id}/`,
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
      await queryClient.invalidateQueries(["schoolFundPettyCash"]);
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

export function useDeleteSchoolFundPettyCash() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/school-fund-petty-cash/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["schoolFundPettyCash"]);
      toast.success("Petty cash entry deleted!", {
        description: "The petty cash entry has been successfully deleted.",
        duration: 3000,
      });

      // Redirect to the petty cash list page after deletion
      router.push("/school-fund/petty-cash");
    },

    onError: (error) => {
      toast.error(`Error deleting petty cash: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
