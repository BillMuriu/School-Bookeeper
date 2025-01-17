import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants";

// Create School Fund Bank Charge Mutation
export function useCreateSchoolFundBankCharge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/school-fund-bank-charges/`,
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
      await queryClient.invalidateQueries(["schoolFundBankCharges"]);

      toast.success("School fund bank charge created!", {
        description:
          "The new school fund bank charge record has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating school fund bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Edit School Fund Bank Charge Mutation
export function useEditSchoolFundBankCharge() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/school-fund-bank-charges/${id}/`,
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
      await queryClient.invalidateQueries(["schoolFundBankCharges"]);

      toast.success("School fund bank charge updated!", {
        description:
          "The school fund bank charge has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating school fund bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Delete School Fund Bank Charge Mutation
export function useDeleteSchoolFundBankCharge() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/school-fund-bank-charges/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["schoolFundBankCharges"]);

      toast.success("School fund bank charge deleted!", {
        description:
          "The school fund bank charge has been successfully deleted.",
        duration: 3000,
      });

      // Redirect to the school fund bank charges list page after deletion
      router.push("/school-fund-bank-charges");
    },

    onError: (error) => {
      toast.error(`Error deleting school fund bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
