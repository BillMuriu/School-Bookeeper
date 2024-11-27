import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants";

// Create Tuition Bank Charge
export function useCreateTuitionBankCharge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/tuition-bank-charges/`,
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
      await queryClient.invalidateQueries(["tuitionBankCharges"]); // Adjust query key if needed

      toast.success("Tuition bank charge created!", {
        description:
          "The new tuition bank charge has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating tuition bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Edit Tuition Bank Charge
export function useEditTuitionBankCharge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/tuition-bank-charges/${id}/`,
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
      await queryClient.invalidateQueries(["tuitionBankCharges"]); // Adjust query key if needed

      toast.success("Tuition bank charge updated!", {
        description: "The tuition bank charge has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating tuition bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Delete Tuition Bank Charge
export function useDeleteTuitionBankCharge() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/tuition-bank-charges/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["tuitionBankCharges"]); // Adjust query key if needed

      toast.success("Tuition bank charge deleted!", {
        description: "The tuition bank charge has been successfully deleted.",
        duration: 3000,
      });

      // Redirect to the tuition bank charges list page after deletion
      router.push("/tuition-bank-charges");
    },

    onError: (error) => {
      toast.error(`Error deleting tuition bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
