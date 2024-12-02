// mutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants";

export function useCreateTermPeriod() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${BASE_URL}/term_periods/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["termPeriods"]);
      const termPeriodId = data.id;
      router.push(`/term-periods/view/${termPeriodId}`);

      toast.success("Term Period created!", {
        description: "The new Term Period has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating Term Period: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useEditTermPeriod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      await axios.put(`${BASE_URL}/term_periods/${id}/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["termPeriods"] });
      toast.success("Term Period Edited Successfully!", {
        description: "The Term Period has been successfully edited.",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(`Error editing Term Period: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useDeleteTermPeriods() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (ids) => {
      // Delete term periods in parallel
      await Promise.all(
        ids.map((id) => axios.delete(`${BASE_URL}/term_periods/${id}/`))
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["termPeriods"] });
      toast.success("Term Periods Deleted Successfully!", {
        description: "The Term Periods have been successfully deleted.",
        duration: 3000,
      });
      // Redirect after deletion
      router.push("/term-periods");
    },
    onError: (error) => {
      toast.error(`Error deleting Term Periods: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
