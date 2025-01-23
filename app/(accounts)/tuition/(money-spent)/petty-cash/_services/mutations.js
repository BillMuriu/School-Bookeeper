// queries.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner"; // Assuming you're using Sonner for toast notifications
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants"; // Importing BASE_URL from constants

// Query for a single Tuition Petty Cash record by ID
export function useTuitionPettyCash(id) {
  return useQuery({
    queryKey: ["tuitionPettyCash", { id }],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/tuition-pettycash/${id}/`); // Using BASE_URL
      return response.data;
    },
  });
}

// Query for all Tuition Petty Cash records
export function useTuitionPettyCashs() {
  return useQuery({
    queryKey: ["tuitionPettyCashs"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/tuition-pettycash/`); // Using BASE_URL
      return response.data;
    },
  });
}

// Mutation for creating a Tuition Petty Cash record
export function useCreateTuitionPettyCash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/tuition-pettycash/`, // Using BASE_URL
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["tuitionPettyCash"]); // Using updated query key
      toast.success("Tuition petty cash created!", {
        description:
          "The new Tuition petty cash record has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating Tuition petty cash: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Mutation for editing a Tuition Petty Cash record
export function useEditTuitionPettyCash() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/tuition-pettycash/${id}/`, // Using BASE_URL
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["tuitionPettyCash"]); // Using updated query key
      toast.success("Tuition petty cash entry updated!", {
        description:
          "The Tuition petty cash entry has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating Tuition petty cash: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Mutation for deleting a Tuition Petty Cash record
export function useDeleteTuitionPettyCash() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/tuition-pettycash/${id}/`, // Using BASE_URL
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["tuitionPettyCash"]); // Using updated query key
      toast.success("Tuition petty cash entry deleted!", {
        description:
          "The Tuition petty cash entry has been successfully deleted.",
        duration: 3000,
      });

      // Redirect to the Tuition petty cash list page after deletion
      router.push("/tuition-petty-cash");
    },

    onError: (error) => {
      toast.error(`Error deleting Tuition petty cash: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
