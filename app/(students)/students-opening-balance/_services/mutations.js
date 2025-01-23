import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants"; // http://127.0.0.1:8000/api

// Mutation to create a student opening balance
export function useCreateStudentOpeningBalance() {
  const queryClient = useQueryClient();
  const router = useRouter(); // Initialize the router

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/students_opening_balances/`,
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
      await queryClient.invalidateQueries(["studentOpeningBalances"]); // Invalidate the query
      toast.success("Opening balance created!", {
        description:
          "The student opening balance has been successfully created.",
        duration: 3000,
      });

      // Redirect to the new opening balance detail page
      router.push("/students-opening-balance");
    },

    onError: (error) => {
      toast.error(`Error creating opening balance: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
// Mutation to edit a student opening balance
export function useEditStudentOpeningBalance() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/students_opening_balances/${id}/`,
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
      await queryClient.invalidateQueries(["studentOpeningBalances"]); // Invalidate the query
      toast.success("Opening balance updated!", {
        description:
          "The student opening balance has been successfully updated.",
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

// Mutation to delete a student opening balance
export function useDeleteStudentOpeningBalance() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/students_opening_balances/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["studentOpeningBalances"]); // Invalidate the query
      toast.success("Opening balance deleted!", {
        description:
          "The student opening balance has been successfully deleted.",
        duration: 3000,
      });

      // Redirect to the opening balance list page after deletion
      router.push("/students-opening-balance");
    },

    onError: (error) => {
      toast.error(`Error deleting opening balance: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
